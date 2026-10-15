// ============================================================================
// Store Data - Updated 50 produk kacamata & Full Collection Support
// ============================================================================

import type {
  Collection,
  FrameMaterial,
  FrameShape,
  LensType,
  Product,
  ProductImage,
  ProductSpecification,
  ProductVariant,
  ProductView,
  ProductFilters,
  SortOption,
} from "./store-types";

// ============================================================================
// Master Data Collections (Lengkap untuk semua menu Navbar)
// ============================================================================

export const collections: Collection[] = [
  {
    collection_id: 1,
    code: "SUMMIT",
    name: "Summit",
    tagline: "Conquer every peak",
    description: "Koleksi untuk pendakian gunung/hiking dengan lensa polarized tahan banting.",
    style_attributes: "Rugged, Sporty, Polarized",
    is_active: true,
    display_order: 1,
  },
  {
    collection_id: 2,
    code: "COAST",
    name: "Coast",
    tagline: "Catch the horizon",
    description: "Koleksi bertema pantai/laut dengan warna cerah dan nuansa santai.",
    style_attributes: "Relaxed, Fresh, Colorful",
    is_active: true,
    display_order: 2,
  },
  {
    collection_id: 3,
    code: "METRO",
    name: "Metro",
    tagline: "Own the streets",
    description: "Koleksi urban/kota dengan desain modern dan clean-cut streetwear.",
    style_attributes: "Clean, Modern, Streetwear",
    is_active: true,
    display_order: 3,
  },
  {
    collection_id: 4,
    code: "DUNE",
    name: "Dune",
    tagline: "Wander the wild",
    description: "Koleksi bertema gurun/travel dengan nuansa earthy dan bentuk oversized vintage.",
    style_attributes: "Earthy, Vintage, Oversized",
    is_active: true,
    display_order: 4,
  },
  {
    collection_id: 5,
    code: "TRAIL",
    name: "Trail",
    tagline: "Built for the outdoors",
    description: "Koleksi outdoor/camping dengan desain fungsional.",
    style_attributes: "Functional, Outdoorsy",
    is_active: true,
    display_order: 5,
  },
  {
    collection_id: 6,
    code: "SOLAR",
    name: "Solar",
    tagline: "Shine under the sun",
    description: "Koleksi dengan proteksi ekstra dari silau terik matahari.",
    style_attributes: "Polarized, High Protection",
    is_active: true,
    display_order: 6,
  },
  {
    collection_id: 7,
    code: "NOIR",
    name: "Noir",
    tagline: "Elegance in darkness",
    description: "Koleksi frame matte gelap bernuansa eksklusif dan elegan.",
    style_attributes: "Monochrome, Matte, Luxury",
    is_active: true,
    display_order: 7,
  },
  {
    collection_id: 8,
    code: "APEX",
    name: "Apex",
    tagline: "Peak performance",
    description: "Frame desain pilot modern berkinerja tinggi.",
    style_attributes: "Pilot, Aerodynamic",
    is_active: true,
    display_order: 8,
  },
  {
    collection_id: 9,
    code: "TIDE",
    name: "Tide",
    tagline: "Flow with the style",
    description: "Desain mengalir yang elegan untuk aktivitas pantai dan harian.",
    style_attributes: "Hydrodynamic, Trendy",
    is_active: true,
    display_order: 9,
  },
  {
    collection_id: 10,
    code: "NOMAD",
    name: "Nomad",
    tagline: "For the endless wanderer",
    description: "Kacamata fleksibel dan tangguh untuk para penjelajah dunia.",
    style_attributes: "Traveler, Flexible, Durable",
    is_active: true,
    display_order: 10,
  },
];

export const frameMaterials: FrameMaterial[] = [
  { material_id: 1, name: "Titanium", description: "Ringan & tahan karat" },
  { material_id: 2, name: "Acetate", description: "Plastik premium fleksibel" },
  { material_id: 3, name: "Metal", description: "Klasik & elegan" },
  { material_id: 4, name: "TR-90", description: "Nyaman & tahan benturan" },
];

export const frameShapes: FrameShape[] = [
  { shape_id: 1, name: "Apex", description: "Bentuk pilot klasik" },
  { shape_id: 2, name: "Round", description: "Bulat retro" },
  { shape_id: 3, name: "Square", description: "Kotak modern" },
  { shape_id: 4, name: "Wayfarer", description: "Bentuk ikonik" },
  { shape_id: 5, name: "Cat Eye", description: "Feminin & stylish" },
];

export const lensTypes: LensType[] = [
  { lens_type_id: 1, name: "Polarized", description: "Anti silau" },
  { lens_type_id: 2, name: "UV400", description: "Proteksi UV lengkap" },
  { lens_type_id: 3, name: "Photochromic", description: "Berubah warna otomatis" },
  { lens_type_id: 4, name: "Blue Cut", description: "Blokir cahaya biru" },
];

// ============================================================================
// 50 Products Data
// ============================================================================

const productNames: string[] = [
  "Summit Explorer", "Summit Pro", "Summit Alpine", "Summit Ridge", "Summit Peak",
  "Coast Breeze", "Coast Wave", "Coast Horizon", "Coast Sunset", "Coast Surge",
  "Metro Style", "Metro Classic", "Metro Edge", "Metro Blitz", "Metro Pulse",
  "Dune Wanderer", "Dune Safari", "Dune Mirage", "Dune Trail", "Dune Vista",
  "Trail Blazer", "Trail Runner", "Trail Seeker", "Trail Force", "Trail Quest",
  "Solar Aegis", "Solar Flare", "Solar Eclipse", "Solar Ray", "Solar Horizon",
  "Noir Matte", "Noir Phantom", "Noir Obsidian", "Noir Onyx", "Noir Shadow",
  "Apex Pilot", "Apex Vector", "Apex Aero", "Apex Stealth", "Apex Prime",
  "Tide Wave", "Tide Flow", "Tide Breeze", "Tide Surge", "Tide Crest",
  "Nomad Wander", "Nomad Quest", "Nomad Drift", "Nomad Rover", "Nomad Echo",
];

const slugs: string[] = productNames.map((name) =>
  name.toLowerCase().replace(/\s+/g, "-")
);

const descriptions: string[] = [
  "Kacamata outdoor untuk pendakian gunung dengan proteksi UV tinggi.",
  "Kacamata premium untuk pendaki profesional.",
  "Kacamata ringan untuk medan alpine yang ekstrem.",
  "Desain kokoh untuk menaklukkan gunung tertinggi.",
  "Kacamata puncak dengan lensa polarized anti-silau.",
  "Kacamata santai untuk aktivitas pantai.",
  "Desain sporty untuk olahraga air.",
  "Tampilan elegan menyapa horizon laut.",
  "Gradasi warna senja yang memukau.",
  "Kekuatan laut dalam genggaman Anda.",
  "Kacamata fashionable untuk gaya urban.",
  "Klasik abadi untuk profesional muda.",
  "Tajam dan modern untuk jalanan kota.",
  "Blitz gaya metropolitan Anda.",
  "Nadi kehidupan kota dalam desain.",
  "Petualangan gurun dengan gaya vintage.",
  "Eksplorasi safari yang ikonik.",
  "Fatamorgana di padang pasir.",
  "Jejak alam terbuka.",
  "Pemandangan liar terbaik.",
  "Kacamata outdoor tahan banting untuk hiking.",
  "Ringan untuk lari lintas alam.",
  "Mencari petualangan baru.",
  "Kekuatan untuk medan berat.",
  "Misi pencarian Anda dimulai.",
  "Lensa Solar polarized pemblokir radiasi terik matahari.",
  "Silau terik pudar seketika dengan seri Solar Flare.",
  "Perlindungan matahari maksimal untuk aktivitas luar ruangan.",
  "Sorotan gaya tajam di bawah sinar surya.",
  "Melihat cakrawala cerah dengan nyaman.",
  "Hitam matte elegan tanpa kompromi.",
  "Keanggunan tersembunyi dalam seri Noir Phantom.",
  "Batu obsidian hitam menginspirasi desain frame ini.",
  "Gaya berkelas untuk malam dan siang hari.",
  "Bayangan tegas penuh percaya diri.",
  "Bentuk pilot Apex paling presisi.",
  "Aerodinamis tinggi untuk kecepatan.",
  "Pilihan profesional udara dan darat.",
  "Desain stealth tak terhentikan.",
  "Performa puncak di segala lini.",
  "Irama gelombang laut dalam genggaman.",
  "Mengalir santai menyusuri pantai.",
  "Angin laut segar memikat hati.",
  "Gaya santai tepi pantai paling pas.",
  "Puncak riak gaya kacamata pantai.",
  "Nomad siap menemani ke mana pun perjalananmu.",
  "Perjalanan jauh terasa semakin nyaman.",
  "Petualang sejati tidak pernah kehilangan arah.",
  "Menjelajah sudut kota dan alam liar.",
  "Gema suara alam memanggil petualangan.",
];

// Distribusi Koleksi Seimbang (5 produk per koleksi dari 10 koleksi)
const collectionIds: number[] = [
  1,1,1,1,1, 2,2,2,2,2, 3,3,3,3,3, 4,4,4,4,4, 5,5,5,5,5,
  6,6,6,6,6, 7,7,7,7,7, 8,8,8,8,8, 9,9,9,9,9, 10,10,10,10,10
];

const materialIds: number[] = [
  4,1,4,4,1, 4,4,3,2,4, 2,3,3,2,4, 2,4,3,4,2, 4,1,4,4,1,
  3,3,1,1,3, 2,2,3,2,3, 2,4,1,4,2, 2,2,2,2,2, 4,4,4,1,1,
];

const shapeIds: number[] = [
  3,3,3,4,3, 4,4,1,5,4, 4,3,3,4,2, 2,1,2,3,5, 3,3,4,3,3,
  1,1,1,1,1, 2,2,2,2,2, 3,3,3,3,3, 5,5,5,5,5, 3,3,4,3,3,
];

const genders: ("men" | "women" | "unisex" | "kids")[] = [
  "unisex","men","unisex","men","men", "unisex","men","women","women","men",
  "women","men","unisex","men","women", "unisex","men","women","unisex","women",
  "unisex","unisex","men","men","unisex", "men","men","men","unisex","women",
  "women","women","unisex","women","unisex", "men","men","unisex","unisex","women",
  "women","women","women","women","women", "unisex","unisex","unisex","men","unisex",
];

const basePrices: number[] = [
  450000,650000,480000,520000,580000, 350000,400000,380000,420000,460000,
  500000,550000,520000,480000,450000, 480000,420000,390000,370000,440000,
  380000,580000,410000,430000,500000, 750000,680000,820000,790000,880000,
  320000,340000,310000,360000,290000, 450000,420000,480000,380000,350000,
  480000,520000,550000,460000,500000, 350000,380000,400000,450000,420000,
];

export const products: Product[] = productNames.map((name, i) => ({
  product_id: i + 1,
  sku_base: `IDV-${String(i + 1).padStart(3, "0")}`,
  name,
  slug: slugs[i],
  description: descriptions[i],
  collection_id: collectionIds[i],
  material_id: materialIds[i],
  shape_id: shapeIds[i],
  gender_target: genders[i],
  base_price: basePrices[i],
  is_active: true,
  is_featured: i % 5 === 0,
  created_at: "2026-01-15",
  updated_at: "2026-01-15",
}));

// ============================================================================
// Product Variants (2 per product = 100 variants)
// ============================================================================

const frameColors = ["Hitam","Silver","Gold","Biru","Merah","Coklat","Putih","Rose Gold","Gunmetal","Tortoise","Hijau","Ungu","Orange","Clear","Khaki"];
const lensColors = ["Smoke","Green","Blue","Brown","Orange Mirror","Blue Mirror","Photochromic","Gradient","Grey","Amber"];

function generateVariants(): ProductVariant[] {
  const variants: ProductVariant[] = [];
  let vid = 1;
  for (const p of products) {
    for (let v = 0; v < 2; v++) {
      const fc = frameColors[(p.product_id * 3 + v * 7) % frameColors.length];
      const lc = lensColors[(p.product_id * 5 + v * 3) % lensColors.length];
      variants.push({
        variant_id: vid++,
        product_id: p.product_id,
        sku_variant: `${p.sku_base}-${v === 0 ? "A" : "B"}`,
        frame_color: fc,
        lens_color: lc,
        lens_type_id: (p.product_id % 4) + 1,
        is_polarized: p.product_id % 3 === 0,
        price: p.base_price + (v * 30000),
        stock_quantity: 5 + (p.product_id % 20),
        is_active: true,
      });
    }
  }
  return variants;
}

export const productVariants: ProductVariant[] = generateVariants();

// ============================================================================
// Product Images
// ============================================================================

const imageUrls: string[] = [
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1515586838455-8f8f940d6853?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&h=400&fit=crop",
];

export const productImages: ProductImage[] = products.flatMap((p, i) => {
  const url = imageUrls[i % imageUrls.length];
  const variant = productVariants.find((v) => v.product_id === p.product_id);
  return [
    {
      image_id: i * 2 + 1,
      variant_id: variant?.variant_id || i * 2 + 1,
      image_url: url,
      alt_text: p.name,
      is_primary: true,
      display_order: 0,
    },
  ];
});

// ============================================================================
// Product Specifications
// ============================================================================

export const productSpecifications: ProductSpecification[] = products.map((p) => ({
  product_id: p.product_id,
  weight_grams: 22 + (p.product_id % 15),
  lens_width_mm: 48 + (p.product_id % 18),
  bridge_width_mm: 16 + (p.product_id % 7),
  temple_length_mm: 130 + (p.product_id % 25),
  lens_height_mm: 32 + (p.product_id % 15),
  uv_protection: "UV400",
}));

// ============================================================================
// Helper & Query Functions (Fixed & Robust Filter Matching)
// ============================================================================

export function getProductViewById(id: number): ProductView | null {
  const product = products.find((p) => p.product_id === id);
  if (!product) return null;

  const variants = productVariants.filter((v) => v.product_id === id);
  const images = productImages.filter((img) =>
    variants.some((v) => v.variant_id === img.variant_id)
  );
  const specification = productSpecifications.find((s) => s.product_id === id);
  const collection = collections.find((c) => c.collection_id === product.collection_id);
  const material = frameMaterials.find((m) => m.material_id === product.material_id);
  const shape = frameShapes.find((s) => s.shape_id === product.shape_id);
  const lowest_price = Math.min(...variants.map((v) => v.price));

  return {
    ...product,
    collection: collection || undefined,
    material: material || undefined,
    shape: shape || undefined,
    primary_image: images.find((img) => img.is_primary)?.image_url || images[0]?.image_url,
    variants,
    specification: specification || undefined,
    lowest_price,
  };
}

export function getProductViewBySlug(slug: string): ProductView | null {
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;
  return getProductViewById(product.product_id);
}

export function getFeaturedProducts(): ProductView[] {
  return products
    .filter((p) => p.is_featured && p.is_active)
    .map((p) => getProductViewById(p.product_id))
    .filter((p): p is ProductView => p !== null);
}

export function getProductsByCollection(collectionCodeOrName: string): ProductView[] {
  if (!collectionCodeOrName) return [];
  const query = collectionCodeOrName.toLowerCase();
  
  const collection = collections.find(
    (c) =>
      c.code.toLowerCase() === query ||
      c.name.toLowerCase() === query
  );

  if (!collection) return [];

  return products
    .filter((p) => p.collection_id === collection.collection_id && p.is_active)
    .map((p) => getProductViewById(p.product_id))
    .filter((p): p is ProductView => p !== null);
}

export function queryProducts(filters: ProductFilters): ProductView[] {
  let result = products
    .filter((p) => p.is_active)
    .map((p) => getProductViewById(p.product_id))
    .filter((p): p is ProductView => p !== null);

  // Filter berdasarkan Koleksi (Cek Code, Name, atau Kata Kunci di Nama Produk)
  if (filters.collection && filters.collection !== "all") {
    const colQuery = filters.collection.toLowerCase();
    
    const collection = collections.find(
      (c) =>
        c.code.toLowerCase() === colQuery ||
        c.name.toLowerCase() === colQuery
    );

    if (collection) {
      result = result.filter(
        (p) => p.collection?.collection_id === collection.collection_id
      );
    } else {
      result = result.filter(
        (p) =>
          p.collection?.name.toLowerCase().includes(colQuery) ||
          p.name.toLowerCase().includes(colQuery)
      );
    }
  }

  // Filter berdasarkan Material
  if (filters.material) {
    result = result.filter(
      (p) => p.material?.name.toLowerCase() === filters.material!.toLowerCase()
    );
  }

  // Filter berdasarkan Bentuk Frame
  if (filters.shape) {
    result = result.filter(
      (p) => p.shape?.name.toLowerCase() === filters.shape!.toLowerCase()
    );
  }

  // Filter berdasarkan Target Gender
  if (filters.gender) {
    const targetGender = filters.gender.toLowerCase();
    result = result.filter((p) => {
      const g = p.gender_target.toLowerCase();
      if (targetGender === "pria") return g === "men" || g === "unisex";
      if (targetGender === "wanita") return g === "women" || g === "unisex";
      return g === targetGender;
    });
  }

  // Filter Polarized
  if (filters.polarized !== undefined) {
    const wantPolarized = String(filters.polarized) === "true";
    result = result.filter((p) =>
      p.variants?.some((v) => v.is_polarized === wantPolarized)
    );
  }

  // Filter Pencarian Teks
  if (filters.q) {
    const query = filters.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.collection?.name.toLowerCase().includes(query)
    );
  }

  // Pengurutan
  if (filters.sort) {
    result = applySort(result, filters.sort);
  }

  return result;
}

export function applySort(products: ProductView[], sort: SortOption): ProductView[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => (a.lowest_price || 0) - (b.lowest_price || 0));
    case "price-desc":
      return sorted.sort((a, b) => (b.lowest_price || 0) - (a.lowest_price || 0));
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return sorted;
  }
}