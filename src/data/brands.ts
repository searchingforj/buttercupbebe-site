export type Brand = {
  slug: string;
  name: string;
  oneLiner: string;
  websiteUrl?: string;
  lineSheetUrl?: string;
  images: string[];
  featured?: boolean;
};

const imagesFor = (slug: string) => [
  `/brands/${slug}/1.svg`,
  `/brands/${slug}/2.svg`,
  `/brands/${slug}/3.svg`,
];

export const brands: Brand[] = [
  {
    slug: "courtside-kids",
    name: "Courtside Kids",
    oneLiner:
      "Polished boys' activewear with performance fabrics and a classic sport aesthetic.",
    websiteUrl: "https://courtsidekids.com/",
    images: imagesFor("courtside-kids"),
    featured: true,
  },
  {
    slug: "little-paper-kids",
    name: "Little Paper Kids",
    oneLiner:
      "Classic children's apparel featuring vibrant colors, playful patterns, and everyday silhouettes.",
    websiteUrl: "https://www.littlepaperkids.com/",
    images: imagesFor("little-paper-kids"),
    featured: true,
  },
  {
    slug: "yo-baby",
    name: "Yo Baby",
    oneLiner:
      "Bold, playful children's clothing known for standout prints and fashion-forward design.",
    websiteUrl: "https://www.yobabyonline.com/",
    images: imagesFor("yo-baby"),
    featured: true,
  },
  {
    slug: "yogababy",
    name: "Yogababy",
    oneLiner:
      "Performance-driven kids' activewear designed for movement, comfort, and durability.",
    websiteUrl: "https://yogababyclothing.com/",
    images: imagesFor("yogababy"),
    featured: true,
  },
  {
    slug: "velvet-fawn",
    name: "Velvet Fawn",
    oneLiner:
      "Outdoor-inspired children's apparel blending camo classics with everyday comfort.",
    websiteUrl: "https://velvetfawn.com/",
    images: imagesFor("velvet-fawn"),
    featured: true,
  },
  {
    slug: "bushel-and-a-peck",
    name: "Bushel & a Peck",
    oneLiner:
      "Timeless children's knits made from 100% Pima cotton with an elevated everyday feel.",
    images: imagesFor("bushel-and-a-peck"),
    featured: true,
  },
  {
    slug: "little-miss-zoe",
    name: "Little Miss Zoe",
    oneLiner:
      "Colorful, customizable children's jewelry and accessories handcrafted in the USA.",
    websiteUrl: "https://littlemisszoe.com/",
    images: imagesFor("little-miss-zoe"),
  },
  {
    slug: "city-beautiful",
    name: "City Beautiful",
    oneLiner:
      "Classic children's clothing with a modern feel, designed for everyday wear.",
    websiteUrl: "https://citybeautifulchildrensboutique.com/",
    images: imagesFor("city-beautiful"),
  },
  {
    slug: "troupers",
    name: "Troupers",
    oneLiner:
      "Tailored boys' shorts designed to balance classic style with play-ready comfort.",
    websiteUrl: "https://www.shoptroupers.com/",
    images: imagesFor("troupers"),
  },
  {
    slug: "nella-june",
    name: "Nella June",
    oneLiner:
      "Whimsical children's apparel pairing playful prints with timeless silhouettes.",
    websiteUrl: "https://nellajune.com/",
    images: imagesFor("nella-june"),
  },
  {
    slug: "the-original-flap-happy",
    name: "The Original Flap Happy",
    oneLiner:
      "UPF 50+ sun-protective hats, swimwear, and playwear for babies and kids.",
    websiteUrl: "https://www.flaphappy.com/",
    images: imagesFor("the-original-flap-happy"),
  },
  {
    slug: "glitter-option",
    name: "Glitter Option",
    oneLiner:
      "Oversized coloring products and creative activities designed for shared moments.",
    websiteUrl: "https://theglitteroption.com/",
    images: imagesFor("glitter-option"),
  },
  {
    slug: "dear-georgie",
    name: "Dear Georgie",
    oneLiner:
      "Coastal-inspired children's clothing with hand-created patterns and versatile silhouettes.",
    websiteUrl: "https://www.mydeargeorgie.com/",
    images: imagesFor("dear-georgie"),
  },
  {
    slug: "beet-world",
    name: "Beet World",
    oneLiner:
      "Sustainably made children's clothing featuring natural fabrics and modern classics.",
    websiteUrl: "https://beet-world.com/",
    images: imagesFor("beet-world"),
  },
  {
    slug: "larili",
    name: "LARILI",
    oneLiner:
      "Handcrafted children's apparel using traditional embroidery and vibrant artisan prints.",
    websiteUrl: "https://www.larili.com/",
    images: imagesFor("larili"),
  },
  {
    slug: "american-jewel",
    name: "American Jewel",
    oneLiner:
      "Trendy, playful children's accessories including scented and light-up designs.",
    websiteUrl: "https://www.facebook.com/AmericanJewel/about",
    images: imagesFor("american-jewel"),
  },
  {
    slug: "southern-proper-blanks",
    name: "Southern Proper Blanks",
    oneLiner:
      "Wholesale monogram blanks and baby essentials made for personalization.",
    websiteUrl: "https://www.southernproperblanks.com/",
    images: imagesFor("southern-proper-blanks"),
  },
  {
    slug: "eight-thousand-miles",
    name: "Eight Thousand Miles",
    oneLiner:
      "Bohemian-inspired apparel and accessories handcrafted using artisan techniques.",
    websiteUrl: "https://eightthousandmiles.com/",
    images: imagesFor("eight-thousand-miles"),
  },
  {
    slug: "maddie-and-connor",
    name: "Maddie & Connor",
    oneLiner:
      "Classic children's clothing featuring hand-smocked and embroidered designs.",
    websiteUrl: "https://maddieandconnorco.com/",
    images: imagesFor("maddie-and-connor"),
  },
  {
    slug: "weisinger-bamboo",
    name: "Weisinger Bamboo",
    oneLiner:
      "Ultra-soft bamboo children's essentials designed for comfort and everyday wear.",
    websiteUrl: "https://www.weisingerbamboo.com/",
    images: imagesFor("weisinger-bamboo"),
  },
  {
    slug: "zsazsa-and-lolli",
    name: "ZsaZsa & LoLLi",
    oneLiner:
      "Southern-style monogram blanks and classic baby boutique essentials.",
    websiteUrl: "https://zsazsa-lolli.com/",
    images: imagesFor("zsazsa-and-lolli"),
  },
];
