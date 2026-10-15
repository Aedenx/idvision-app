"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Share2,
} from "lucide-react";
import { formatIDR } from "@/lib/store-types";
import type { ProductView, ProductVariant } from "@/lib/store-types";
import { useCart } from "@/components/cart/cart-provider";

interface ProductDetailProps {
  product: ProductView;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  // Ganti addItem menjadi addToCart
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null,
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const imageUrl =
    product.primary_image ||
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=600&fit=crop";

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    // Panggil addToCart secara tepat
    addToCart({
      id: String(selectedVariant.variant_id),
      name: `${product.name} (${selectedVariant.frame_color} / ${selectedVariant.lens_color})`,
      price: selectedVariant.price,
      image: imageUrl,
      quantity: quantity,
    });
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8 md:px-8 lg:px-14">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali ke Produk
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-900">
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex gap-2">
            {[imageUrl].map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImageIndex(i)}
                className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition ${
                  selectedImageIndex === i
                    ? "border-emerald-500"
                    : "border-zinc-800"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Collection Badge */}
          {product.collection && (
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                {product.collection.name} Collection
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-white md:text-4xl">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-emerald-400">
              {formatIDR(selectedVariant?.price || product.base_price)}
            </span>
            {selectedVariant && selectedVariant.price > product.base_price && (
              <span className="text-sm text-zinc-500 line-through">
                {formatIDR(product.base_price)}
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-zinc-400 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Specifications */}
          {product.specification && (
            <div className="rounded-xl bg-zinc-900 p-4">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Spesifikasi
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {product.specification.lens_width_mm && (
                  <div>
                    <span className="text-zinc-500">Lebar Lensa:</span>
                    <span className="ml-2 text-white">
                      {product.specification.lens_width_mm}mm
                    </span>
                  </div>
                )}
                {product.specification.bridge_width_mm && (
                  <div>
                    <span className="text-zinc-500">Jembatan:</span>
                    <span className="ml-2 text-white">
                      {product.specification.bridge_width_mm}mm
                    </span>
                  </div>
                )}
                {product.specification.temple_length_mm && (
                  <div>
                    <span className="text-zinc-500">Tangkai:</span>
                    <span className="ml-2 text-white">
                      {product.specification.temple_length_mm}mm
                    </span>
                  </div>
                )}
                {product.specification.weight_grams && (
                  <div>
                    <span className="text-zinc-500">Berat:</span>
                    <span className="ml-2 text-white">
                      {product.specification.weight_grams}g
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
                Pilih Warna
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.variant_id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm transition ${
                      selectedVariant?.variant_id === variant.variant_id
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        : "border-zinc-700 bg-zinc-800 text-zinc-300 hover:border-zinc-500"
                    }`}
                  >
                    {variant.frame_color} / {variant.lens_color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white">
              Jumlah
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-zinc-700 bg-zinc-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-white transition hover:bg-zinc-700"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="flex h-10 w-10 items-center justify-center text-white transition hover:bg-zinc-700"
                >
                  <Plus size={16} />
                </button>
              </div>
              {selectedVariant && (
                <span className="text-sm text-zinc-400">
                  Stok: {selectedVariant.stock_quantity} tersedia
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={
                !selectedVariant || selectedVariant.stock_quantity === 0
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={18} />
              Tambah ke Keranjang
            </button>
            <button
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-white transition hover:border-emerald-500 hover:text-emerald-400"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>
            <button
              className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-white transition hover:border-emerald-500 hover:text-emerald-400"
              aria-label="Share"
            >
              <Share2 size={20} />
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4">
            {product.material && (
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                {product.material.name}
              </span>
            )}
            {product.shape && (
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                {product.shape.name}
              </span>
            )}
            <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300 capitalize">
              {product.gender_target}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
