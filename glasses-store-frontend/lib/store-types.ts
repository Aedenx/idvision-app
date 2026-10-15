// ============================================================================
// Store Types - Tipe data untuk produk, koleksi, dan keranjang
// ============================================================================

export type GenderTarget = "men" | "women" | "unisex" | "kids";

export interface Collection {
  collection_id: number;
  code: string;
  name: string;
  tagline: string;
  description: string;
  style_attributes: string;
  banner_image_url?: string;
  thumbnail_image_url?: string;
  is_active: boolean;
  display_order: number;
}

export interface FrameMaterial {
  material_id: number;
  name: string;
  description?: string;
}

export interface FrameShape {
  shape_id: number;
  name: string;
  description?: string;
}

export interface LensType {
  lens_type_id: number;
  name: string;
  description?: string;
}

export interface Product {
  product_id: number;
  sku_base: string;
  name: string;
  slug: string;
  description?: string;
  collection_id?: number;
  material_id: number;
  shape_id: number;
  gender_target: GenderTarget;
  base_price: number;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductSpecification {
  product_id: number;
  weight_grams?: number;
  lens_width_mm?: number;
  bridge_width_mm?: number;
  temple_length_mm?: number;
  lens_height_mm?: number;
  uv_protection?: string;
  additional_notes?: string;
}

export interface ProductVariant {
  variant_id: number;
  product_id: number;
  sku_variant: string;
  frame_color: string;
  lens_color: string;
  lens_type_id: number;
  is_polarized: boolean;
  price: number;
  stock_quantity: number;
  weight_grams?: number;
  is_active: boolean;
}

export interface ProductImage {
  image_id: number;
  variant_id: number;
  image_url: string;
  alt_text?: string;
  is_primary: boolean;
  display_order: number;
}

// Extended types untuk tampilan
export interface ProductView extends Product {
  collection?: Collection;
  material?: FrameMaterial;
  shape?: FrameShape;
  primary_image?: string;
  variants?: ProductVariant[];
  specification?: ProductSpecification;
  lowest_price?: number;
}

export interface ProductFilters {
  material?: string;
  shape?: string;
  lens?: string;
  polarized?: string;
  gender?: string;
  collection?: string;
  q?: string;
  sort?: SortOption;
}

export type SortOption = "featured" | "price-asc" | "price-desc" | "name";

// Cart types
export interface CartItemSnapshot {
  variant_id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  frame_color: string;
  lens_color: string;
  lens_type: string;
  unit_price: number;
  quantity: number;
  prescription: Prescription | null;
}

export interface Prescription {
  sphere_od: number;
  sphere_os: number;
  pd_mm: number;
}

export interface CartTotals {
  subtotal_amount: number;
  shipping_cost: number;
  total_amount: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
}

export interface Order {
  id: string;
  items: CartItemSnapshot[];
  address: Address;
  totals: CartTotals;
  status: "pending" | "paid" | "shipped" | "delivered";
  created_at: string;
}

// Utility function
export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
