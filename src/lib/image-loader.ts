"use client";

import type { ImageLoaderProps } from "next/image";
import catalogue from "@/data/image-manifest.json";

type ImageRecord = { prefix: string; widths: number[]; width: number; height: number; blur: string };
const images = catalogue as Record<string, ImageRecord>;

export function imageDetails(src: string) {
  return images[src];
}

export default function imageLoader({ src, width }: ImageLoaderProps) {
  const image = images[src];
  if (!image) return src;
  const size = image.widths.find(candidate => candidate >= width) ?? image.widths.at(-1);
  return `${image.prefix}-${size}.webp`;
}
