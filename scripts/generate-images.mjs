import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Generate before dev/build. Content-addressed filenames can be cached permanently.
const root = path.resolve("public");
const output = path.join(root, "optimized");
const manifestPath = "src/data/image-manifest.json";
const pipelineVersion = "webp-84-v1";
const files = [];
async function scan(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (file === output) continue;
    if (entry.isDirectory()) await scan(file);
    else if (/\.(png|jpe?g|webp)$/i.test(file)) files.push(file);
  }
}
await scan(root);
let previous = {};
try { previous = JSON.parse(await fs.readFile(manifestPath, "utf8")); } catch {}
const manifest = {};
let generated = 0;
async function generate(file) {
  const buffer = await fs.readFile(file);
  const metadata = await sharp(buffer).metadata();
  const rotated = metadata.orientation >= 5 && metadata.orientation <= 8;
  const width = rotated ? metadata.height : metadata.width;
  const height = rotated ? metadata.width : metadata.height;
  const src = `/${path.relative(root, file).split(path.sep).join("/")}`;
  const orientationVersion = metadata.orientation > 1 ? "oriented-v2" : "";
  const hash = createHash("sha256").update(buffer).update(pipelineVersion + orientationVersion).digest("hex").slice(0, 12);
  const prefix = `/optimized${src.replace(/\.[^.]+$/, "")}.${hash}`;
  const old = previous[src];
  if (old?.prefix === prefix && (await Promise.all(old.widths.map(width => fs.access(`${root}${prefix}-${width}.webp`).then(() => true, () => false)))).every(Boolean)) {
    manifest[src] = old;
    return;
  }
  const isLogo = src.startsWith("/brand-logos/") || src.startsWith("/brand/");
  const candidates = isLogo ? [160, 320, 640] : [480, 800, 1200, 1600];
  const widths = [...new Set(candidates.map(size => Math.min(size, width, Math.floor(width * 2400 / height))))];
  await fs.mkdir(path.dirname(`${root}${prefix}`), { recursive: true });
  for (const size of widths) {
    await sharp(buffer).rotate().resize({ width: size, withoutEnlargement: true }).webp({ quality: isLogo ? 90 : 84 }).toFile(`${root}${prefix}-${size}.webp`);
    generated++;
  }
  const blur = await sharp(buffer).rotate().resize({ width: 12, height: 12, fit: "inside" }).webp({ quality: 35 }).toBuffer();
  manifest[src] = { prefix, widths, width, height, blur: `data:image/webp;base64,${blur.toString("base64")}` };
}
// Bound memory/CPU while processing large source photographs.
const queue = [...files].sort();
await Promise.all(Array.from({ length: 3 }, async () => {
  while (queue.length) await generate(queue.shift());
}));
await fs.writeFile(manifestPath, `${JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()), null, 2)}\n`);
console.log(`Image catalogue: ${files.length} originals, ${generated} responsive files generated.`);
