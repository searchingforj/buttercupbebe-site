import { BrandsShowcase } from "@/components/brands-showcase";
import { visibleBrands } from "@/data/brands";

export default function Home() {
  return <BrandsShowcase brands={visibleBrands} />;
}
