"use client";

import type { ReactNode } from "react";

type BrandsAnchorLinkProps = {
  className: string;
  children: ReactNode;
};

function scrollToBrandsSection() {
  const brandsSection = document.getElementById("brands-section");

  if (!brandsSection) {
    return;
  }

  const headerElement = document.querySelector<HTMLElement>("[data-site-header]");
  const headerHeight = headerElement?.getBoundingClientRect().height ?? 0;
  const targetPosition =
    brandsSection.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

  window.history.replaceState(null, "", "/#brands-section");
  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: "smooth",
  });
}

export function BrandsAnchorLink({ className, children }: BrandsAnchorLinkProps) {
  return (
    <a
      href="#brands-section"
      className={className}
      onClick={(event) => {
        event.preventDefault();
        scrollToBrandsSection();
      }}
    >
      {children}
    </a>
  );
}
