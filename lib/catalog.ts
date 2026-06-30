export const productCatalog = {
  id: "aurex-headphones",
  slug: "aurex-signature-one",
  name: "AUREX Signature One",
  description:
    "Immersive luxury audio experience with adaptive ANC, sculpted titanium architecture, and AI-driven tuning.",
  price: 79900,
  compareAt: 89900,
  inventory: 42,
  heroImage: "/images/aurex-campaign-hero.jpg",
  finishes: [
    "Brushed Titanium",
    "Matte Black Ceramic",
    "Polished Aluminum",
    "Reflective Chrome",
    "Carbon Fiber"
  ],
  bodyColors: ["Obsidian Black", "Silver Mist", "Midnight Blue", "Rose Gold"],
  earCushions: ["Ivory Leather", "Espresso Leather", "Slate Alcantara", "Graphite Foam"],
  metalFrames: ["Satin Gold", "Black Chrome", "Titanium Raw"],
  accessories: [
    "Founders travel case",
    "Balanced audio cable",
    "Wireless charging dock",
    "Desk stand"
  ],
  editions: ["Core", "Signature", "Founders"],
  variants: [
    {
      id: "variant-core",
      sku: "AUR-CORE-001",
      name: "Core",
      priceDelta: 0
    },
    {
      id: "variant-signature",
      sku: "AUR-SIG-001",
      name: "Signature",
      priceDelta: 8000
    },
    {
      id: "variant-founders",
      sku: "AUR-FND-001",
      name: "Founders",
      priceDelta: 15000
    }
  ]
} as const;

export const sampleCoupons = [
  { code: "AUREX10", type: "percent", value: 10 },
  { code: "FOUNDERS150", type: "fixed", value: 15000 }
];

export const comparisonProducts = [
  {
    name: "AUREX Signature One",
    anc: "Adaptive AI ANC",
    battery: "80 hours",
    material: "Titanium / Leather",
    weight: "312g"
  },
  {
    name: "AUREX Studio Reference",
    anc: "Studio passive isolation",
    battery: "62 hours",
    material: "Ceramic / Alcantara",
    weight: "298g"
  }
];
