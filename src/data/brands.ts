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

const websiteCardImagesFor = (slug: string, count: number) =>
  Array.from(
    { length: count },
    (_, index) => `/brands/${slug}/website-card-${String(index + 1).padStart(2, "0")}.webp`,
  );

const logoFor = (slug: string) => `/brand-logos/${slug}.png`;

export const brands: Brand[] = [
  {
    slug: "courtside-kids",
    name: "Courtside Kids",
    oneLiner:
      "Polished boys' activewear with performance fabrics and a classic sport aesthetic.",
    websiteUrl: "https://courtsidekids.com/",
    logoUrl: logoFor("courtside-kids"),
    images: [
      ...websiteCardImagesFor("courtside-kids", 2),
      ...imagesFor("courtside-kids"),
    ],
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
    images: [
      ...websiteCardImagesFor("little-paper-kids", 2),
      ...imagesFor("little-paper-kids"),
      "/brands/little-paper-kids/IMG_3916.jpg",
      "/brands/little-paper-kids/4.webp",
      "/brands/little-paper-kids/hero-user-croquet.webp",
      "/brands/little-paper-kids/5.webp",
    ],
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
    images: [
      ...websiteCardImagesFor("yo-baby", 2),
      ...imagesFor("yo-baby"),
    ],
    featured: true,
  },
  {
    slug: "yogababy",
    name: "Yoga Baby",
    oneLiner:
      "Performance-driven kids' activewear designed for movement, comfort, and durability.",
    websiteUrl: "https://yogababyclothing.com/",
    orderUrl: "https://www.brandboom.com/app/a/6CC7BE69476",
    logoUrl: logoFor("yogababy"),
    images: [
      ...websiteCardImagesFor("yogababy", 2),
      ...imagesFor("yogababy"),
    ],
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
    images: [
      ...websiteCardImagesFor("velvet-fawn", 2),
      ...imagesFor("velvet-fawn"),
    ],
    featured: true,
  },
  {
    slug: "bushel-and-a-peck",
    name: "Bushel & a Peck",
    oneLiner:
      "Timeless children's knits made from 100% Pima cotton with an elevated everyday feel.",
    orderUrl: "https://www.brandboom.com/Bushelandapeck/a/D285D8820E5",
    logoUrl: logoFor("bushel-and-a-peck"),
    images: [
      "/brands/bushel-and-a-peck/fw26-card-01.webp",
      "/brands/bushel-and-a-peck/fw26-card-02.webp",
      "/brands/bushel-and-a-peck/fw26-card-03.webp",
      "/brands/bushel-and-a-peck/fw26-card-04.webp",
      "/brands/bushel-and-a-peck/fw26-card-05.webp",
      ...imagesFor("bushel-and-a-peck"),
    ],
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
    images: [
      ...websiteCardImagesFor("little-miss-zoe", 2),
      "/brands/little-miss-zoe/1.webp",
      "/brands/little-miss-zoe/2.webp",
    ],
  },
  {
    slug: "city-beautiful",
    name: "City Beautiful",
    oneLiner:
      "Classic children's clothing with a modern feel, designed for everyday wear.",
    websiteUrl: "https://citybeautifulchildrensboutique.com/",
    orderUrl: "https://www.brandboom.com/app/a/38652D59303",
    logoUrl: logoFor("city-beautiful"),
    images: [
      ...websiteCardImagesFor("city-beautiful", 1),
      ...imagesFor("city-beautiful"),
    ],
  },
  {
    slug: "troupers",
    name: "Troupers",
    oneLiner:
      "Tailored boys' shorts designed to balance classic style with play-ready comfort.",
    websiteUrl: "https://www.shoptroupers.com/",
    orderUrl: "https://www.brandboom.com/app/a/5078B8286A6",
    logoUrl: logoFor("troupers"),
    images: [
      ...websiteCardImagesFor("troupers", 2),
      "/brands/troupers/1.webp",
      "/brands/troupers/3.webp",
    ],
  },
  {
    slug: "nella-june",
    name: "Nella June",
    oneLiner:
      "Whimsical children's apparel pairing playful prints with timeless silhouettes.",
    websiteUrl: "https://nellajune.com/",
    orderUrl: "https://www.brandboom.com/app/a/7889A08268E",
    logoUrl: logoFor("nella-june"),
    images: [
      ...websiteCardImagesFor("nella-june", 2),
      ...imagesFor("nella-june"),
      "/brands/nella-june/4.webp",
      "/brands/nella-june/5.webp",
      "/brands/nella-june/6.webp",
      "/brands/nella-june/7.webp",
      "/brands/nella-june/8.webp",
      "/brands/nella-june/9.webp",
    ],
  },
  {
    slug: "the-original-flap-happy",
    name: "The Original Flap Happy",
    oneLiner:
      "UPF 50+ sun-protective hats, swimwear, and playwear for babies and kids.",
    websiteUrl: "https://www.flaphappy.com/",
    logoUrl: logoFor("the-original-flap-happy"),
    images: [
      ...websiteCardImagesFor("the-original-flap-happy", 2),
      ...imagesFor("the-original-flap-happy"),
    ],
  },
  {
    slug: "glitter-option",
    name: "Glitter Option",
    oneLiner:
      "Oversized coloring products and creative activities designed for shared moments.",
    websiteUrl: "https://theglitteroption.com/",
    orderUrl: "https://www.brandboom.com/app/a/0BB49A9DDE2",
    logoUrl: logoFor("glitter-option"),
    images: [
      ...websiteCardImagesFor("glitter-option", 1),
      ...imagesFor("glitter-option"),
    ],
  },
  {
    slug: "dear-georgie",
    name: "Dear Georgie",
    oneLiner:
      "Coastal-inspired children's clothing with hand-created patterns and versatile silhouettes.",
    websiteUrl: "https://www.mydeargeorgie.com/",
    orderUrl: "https://www.brandboom.com/app/a/9ECB62240BC",
    logoUrl: logoFor("dear-georgie"),
    images: [
      "/brands/dear-georgie/website-card-02.webp",
      "/brands/dear-georgie/website-card-01.webp",
      ...imagesFor("dear-georgie"),
    ],
  },
  {
    slug: "beet-world",
    name: "Beet World",
    oneLiner:
      "Sustainably made children's clothing featuring natural fabrics and modern classics.",
    websiteUrl: "https://beet-world.com/",
    orderUrl: "https://www.brandboom.com/app/a/B5E99B578C3",
    logoUrl: logoFor("beet-world"),
    images: [
      ...websiteCardImagesFor("beet-world", 2),
      ...imagesFor("beet-world"),
    ],
  },
  {
    slug: "larili",
    name: "LARILI",
    oneLiner:
      "Handcrafted children's apparel using traditional embroidery and vibrant artisan prints.",
    websiteUrl: "https://www.larili.com/",
    orderUrl: "https://www.brandboom.com/app/a/8F5F943ED4E",
    logoUrl: logoFor("larili"),
    images: [
      ...websiteCardImagesFor("larili", 2),
      ...imagesFor("larili"),
    ],
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
    orderUrl: "https://www.brandboom.com/app/a/604C0A9CB10",
    logoUrl: logoFor("southern-proper-blanks"),
    images: [
      ...websiteCardImagesFor("southern-proper-blanks", 2),
      ...imagesFor("southern-proper-blanks"),
    ],
  },
  {
    slug: "cape-point-co",
    name: "Cape Point Co.",
    oneLiner:
      "Coastal North Carolina children's line creating hand-smocked garments with fishing-inspired details, classic silhouettes, and thoughtful everyday charm.",
    websiteUrl: "https://www.instagram.com/capepointclothing/",
    orderUrl: "https://www.brandboom.com/app/a/3D269B4A451",
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
    images: [
      ...websiteCardImagesFor("sawyer-and-spade", 2),
      "/brands/sawyer-and-spade/3.webp",
    ],
  },
  {
    slug: "eight-thousand-miles",
    name: "Eight Thousand Miles",
    oneLiner:
      "Bohemian-inspired apparel and accessories handcrafted using artisan techniques.",
    websiteUrl: "https://eightthousandmiles.com/",
    logoUrl: logoFor("eight-thousand-miles"),
    images: [
      ...websiteCardImagesFor("eight-thousand-miles", 2),
      ...imagesFor("eight-thousand-miles"),
    ],
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
    images: [
      "/brands/weisinger-bamboo/2.webp",
      "/brands/weisinger-bamboo/3.webp",
    ],
  },
  {
    slug: "smockingbird",
    name: "Smockingbird",
    oneLiner:
      "Classic heirloom-inspired children's pieces with handcrafted detailing and elevated prints that balance timeless charm and everyday wearability.",
    orderUrl: "https://www.brandboom.com/smockingbirdbuttercup/a/F916F084324",
    logoUrl: logoFor("smockingbird"),
    images: [
      ...websiteCardImagesFor("smockingbird", 2),
      ...imagesFor("smockingbird"),
    ],
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
    images: [
      "/brands/ml-kids/2.webp",
      "/brands/ml-kids/1.webp",
      "/brands/ml-kids/3.webp",
    ],
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
