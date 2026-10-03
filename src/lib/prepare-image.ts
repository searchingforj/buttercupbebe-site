"use client";

import { getImageProps } from "next/image";
import imageLoader from "@/lib/image-loader";

export const GALLERY_SIZES = "(min-width: 960px) min(64vw, 720px), (min-width: 640px) 600px, calc(100vw - 24px)";
const prepared = new Map<string, Promise<void>>();

export function prepareImage(src: string, sizes = GALLERY_SIZES, priority: "high" | "low" = "low") {
  const key = `${src}:${sizes}:${window.innerWidth}:${window.devicePixelRatio}`;
  const existing = prepared.get(key);
  if (existing) return existing;
  const promise = (async () => {
    const { props } = getImageProps({ src, alt: "", fill: true, sizes, loader: imageLoader });
    const image = new window.Image();
    image.decoding = "async";
    image.fetchPriority = priority;
    image.sizes = props.sizes ?? sizes;
    image.srcset = props.srcSet ?? "";
    image.src = props.src;
    await image.decode();
  })();
  prepared.set(key, promise);
  promise.catch(() => prepared.delete(key));
  if (prepared.size > 80) prepared.delete(prepared.keys().next().value!);
  return promise;
}

export function canPrefetchImages() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
}
