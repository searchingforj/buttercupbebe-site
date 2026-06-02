export type Brand = {
  slug: string;
  name: string;
  oneLiner: string;
  websiteUrl?: string;
  orderUrl?: string;
  orderAccessNote?: string;
  logoUrl?: string;
  lookbookUrl?: string;
  lineSheetUrl?: string;
  images: string[];
  featured?: boolean;
  active?: boolean;
};

const imagesFor = (slug: string) => [
  `/brands/${slug}/1.webp`,
  `/brands/${slug}/2.webp`,
  `/brands/${slug}/3.webp`,
];

const logoFor = (slug: string) => `/brand-logos/${slug}.png`;

export const brands: Brand[] = [
  {
    slug: "courtside-kids",
    name: "Courtside Kids",
    oneLiner:
      "Polished boys' activewear with performance fabrics and a classic sport aesthetic.",
    websiteUrl: "https://courtsidekids.com/",
    logoUrl: logoFor("courtside-kids"),
    images: imagesFor("courtside-kids"),
    featured: true,
  },
  {
    slug: "little-paper-kids",
    name: "Little Paper Kids",
    oneLiner:
      "Classic children's apparel featuring vibrant colors, playful patterns, and everyday silhouettes.",
    websiteUrl: "https://www.littlepaperkids.com/",
    orderUrl: "https://www.brandboom.com/LittlePaperKids26/a/4E2FF88D4E2",
    logoUrl: logoFor("little-paper-kids"),
    images: imagesFor("little-paper-kids"),
    featured: true,
  },
  {
    slug: "yo-baby",
    name: "Yo Baby",
    oneLiner:
      "Bold, playful children's clothing known for standout prints and fashion-forward design.",
    websiteUrl: "https://www.yobabyonline.com/",
    orderUrl: "https://www.brandboom.com/app/a/E4A44625BD2",
    logoUrl: logoFor("yo-baby"),
    images: imagesFor("yo-baby"),
    featured: true,
  },
  {
    slug: "yogababy",
    name: "Yogababy",
    oneLiner:
      "Performance-driven kids' activewear designed for movement, comfort, and durability.",
    websiteUrl: "https://yogababyclothing.com/",
    orderUrl: "https://www.brandboom.com/app/a/6CC7BE69476",
    logoUrl: logoFor("yogababy"),
    images: imagesFor("yogababy"),
    featured: true,
  },
  {
    slug: "velvet-fawn",
    name: "Velvet Fawn",
    oneLiner:
      "Outdoor-inspired children's apparel blending camo classics with everyday comfort.",
    websiteUrl: "https://velvetfawn.com/",
    orderUrl: "https://wholesale.velvetfawn.com/signup",
    logoUrl: logoFor("velvet-fawn"),
    images: imagesFor("velvet-fawn"),
    featured: true,
  },
  {
    slug: "bushel-and-a-peck",
    name: "Bushel & a Peck",
    oneLiner:
      "Timeless children's knits made from 100% Pima cotton with an elevated everyday feel.",
    orderUrl: "https://www.brandboom.com/app/a/3F646C942AC",
    logoUrl: logoFor("bushel-and-a-peck"),
    images: imagesFor("bushel-and-a-peck"),
    featured: true,
  },
  {
    slug: "little-miss-zoe",
    name: "Little Miss Zoe",
    oneLiner:
      "Colorful, customizable children's jewelry and accessories handcrafted in the USA.",
    websiteUrl: "https://littlemisszoe.com/",
    orderUrl: "https://www.brandboom.com/app/a/11F2D7172EB",
    logoUrl: logoFor("little-miss-zoe"),
    images: imagesFor("little-miss-zoe"),
  },
  {
    slug: "city-beautiful",
    name: "City Beautiful",
    oneLiner:
      "Classic children's clothing with a modern feel, designed for everyday wear.",
    websiteUrl: "https://citybeautifulchildrensboutique.com/",
    orderUrl: "https://www.brandboom.com/app/a/8EF22F1E250",
    logoUrl: logoFor("city-beautiful"),
    images: imagesFor("city-beautiful"),
  },
  {
    slug: "troupers",
    name: "Troupers",
    oneLiner:
      "Tailored boys' shorts designed to balance classic style with play-ready comfort.",
    websiteUrl: "https://www.shoptroupers.com/",
    orderUrl: "https://www.brandboom.com/app/a/5078B8286A6",
    logoUrl: logoFor("troupers"),
    images: imagesFor("troupers"),
  },
  {
    slug: "nella-june",
    name: "Nella June",
    oneLiner:
      "Whimsical children's apparel pairing playful prints with timeless silhouettes.",
    websiteUrl: "https://nellajune.com/",
    orderUrl: "https://www.brandboom.com/app/a/7889A08268E",
    logoUrl: logoFor("nella-june"),
    images: imagesFor("nella-june"),
  },
  {
    slug: "the-original-flap-happy",
    name: "The Original Flap Happy",
    oneLiner:
      "UPF 50+ sun-protective hats, swimwear, and playwear for babies and kids.",
    websiteUrl: "https://www.flaphappy.com/",
    logoUrl: logoFor("the-original-flap-happy"),
    images: imagesFor("the-original-flap-happy"),
  },
  {
    slug: "glitter-option",
    name: "Glitter Option",
    oneLiner:
      "Oversized coloring products and creative activities designed for shared moments.",
    websiteUrl: "https://theglitteroption.com/",
    orderUrl: "https://www.brandboom.com/app/a/0BB49A9DDE2",
    logoUrl: logoFor("glitter-option"),
    images: imagesFor("glitter-option"),
  },
  {
    slug: "dear-georgie",
    name: "Dear Georgie",
    oneLiner:
      "Coastal-inspired children's clothing with hand-created patterns and versatile silhouettes.",
    websiteUrl: "https://www.mydeargeorgie.com/",
    orderUrl: "https://www.brandboom.com/app/a/9ECB62240BC",
    logoUrl: logoFor("dear-georgie"),
    images: imagesFor("dear-georgie"),
  },
  {
    slug: "beet-world",
    name: "Beet World",
    oneLiner:
      "Sustainably made children's clothing featuring natural fabrics and modern classics.",
    websiteUrl: "https://beet-world.com/",
    orderUrl: "https://www.brandboom.com/app/a/B5E99B578C3",
    logoUrl: logoFor("beet-world"),
    images: imagesFor("beet-world"),
  },
  {
    slug: "larili",
    name: "LARILI",
    oneLiner:
      "Handcrafted children's apparel using traditional embroidery and vibrant artisan prints.",
    websiteUrl: "https://www.larili.com/",
    orderUrl: "https://www.brandboom.com/app/a/3CF3E5D718D",
    logoUrl: logoFor("larili"),
    images: imagesFor("larili"),
  },
  {
    slug: "american-jewel",
    name: "American Jewel",
    oneLiner:
      "Trendy, playful children's accessories including scented and light-up designs.",
    websiteUrl: "https://www.facebook.com/AmericanJewel/about",
    orderUrl: "https://www.brandboom.com/app/a/A860ABF0D59",
    logoUrl: logoFor("american-jewel"),
    images: imagesFor("american-jewel"),
  },
  {
    slug: "southern-proper-blanks",
    name: "Southern Proper Blanks",
    oneLiner:
      "Wholesale monogram blanks and baby essentials made for personalization.",
    websiteUrl: "https://www.southernproperblanks.com/",
    orderUrl: "https://www.brandboom.com/app/a/4D09EA0589E",
    logoUrl: logoFor("southern-proper-blanks"),
    images: imagesFor("southern-proper-blanks"),
  },
  {
    slug: "cape-point-co",
    name: "Cape Point Co.",
    oneLiner:
      "Coastal North Carolina children's line creating hand-smocked garments with fishing-inspired details, classic silhouettes, and thoughtful everyday charm.",
    websiteUrl: "https://www.instagram.com/capepointclothing/",
    orderUrl: "https://www.faire.com/brand/b_74mke8u3nk/",
    logoUrl: logoFor("cape-point-co"),
    images: imagesFor("cape-point-co"),
  },
  {
    slug: "sawyer-and-spade",
    name: "Sawyer & Spade",
    oneLiner:
      "Mom-owned Houston children's brand creating thoughtfully designed embroidered styles with handpicked fabrics, custom charm, and playful everyday polish.",
    websiteUrl: "https://sawyerandspade.com/",
    orderUrl: "https://www.brandboom.com/app/a/878C710A8DE",
    logoUrl: logoFor("sawyer-and-spade"),
    images: imagesFor("sawyer-and-spade"),
  },
  {
    slug: "eight-thousand-miles",
    name: "Eight Thousand Miles",
    oneLiner:
      "Bohemian-inspired apparel and accessories handcrafted using artisan techniques.",
    websiteUrl: "https://eightthousandmiles.com/",
    logoUrl: logoFor("eight-thousand-miles"),
    images: imagesFor("eight-thousand-miles"),
  },
  {
    slug: "maddie-and-connor",
    name: "Maddie & Connor",
    oneLiner:
      "Classic children's clothing featuring hand-smocked and embroidered designs.",
    websiteUrl: "https://maddieandconnorco.com/",
    orderUrl: "https://www.brandboom.com/app/a/B3D7D6F49B0",
    logoUrl: logoFor("maddie-and-connor"),
    images: imagesFor("maddie-and-connor"),
    active: false,
  },
  {
    slug: "weisinger-bamboo",
    name: "Weisinger Bamboo",
    oneLiner:
      "Ultra-soft bamboo children's essentials designed for comfort and everyday wear.",
    websiteUrl: "https://www.weisingerbamboo.com/",
    orderUrl: "https://www.brandboom.com/app/a/FB573684A3C",
    logoUrl: logoFor("weisinger-bamboo"),
    images: imagesFor("weisinger-bamboo"),
  },
  {
    slug: "smockingbird",
    name: "Smockingbird",
    oneLiner:
      "Classic heirloom-inspired children's pieces with handcrafted detailing and elevated prints that balance timeless charm and everyday wearability.",
    orderUrl: "https://www.brandboom.com/app/a/C7493E24259",
    logoUrl: logoFor("smockingbird"),
    images: imagesFor("smockingbird"),
  },
  {
    slug: "lemon-loves-lime",
    name: "Lemon Loves Lime",
    oneLiner:
      "Bright, story-driven girls' apparel with boutique-friendly silhouettes and whimsical details that celebrate childhood joy and affectionate design.",
    logoUrl: logoFor("lemon-loves-lime"),
    images: imagesFor("lemon-loves-lime"),
  },
  {
    slug: "ml-kids",
    name: "ML Kids",
    oneLiner:
      "Trend-forward shabby chic styles for girls and tweens, offering coordinated sets, statement dresses, and spirited seasonal collections.",
    logoUrl: logoFor("ml-kids"),
    images: imagesFor("ml-kids"),
  },
  {
    slug: "zsazsa-and-lolli",
    name: "ZsaZsa & LoLLi",
    oneLiner:
      "Southern-style monogram blanks and classic baby boutique essentials.",
    websiteUrl: "https://zsazsa-lolli.com/",
    orderUrl: "https://www.brandboom.com/app/a/AFE80590EC0",
    logoUrl: logoFor("zsazsa-and-lolli"),
    images: imagesFor("zsazsa-and-lolli"),
  },
];

export const visibleBrands = brands.filter((brand) => brand.active !== false);
