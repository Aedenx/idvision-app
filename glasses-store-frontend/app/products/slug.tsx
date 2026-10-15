"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { formatIDR } from "@/lib/store-types";
import { useCart } from "@/components/cart/cart-provider";
import { getProductBySlugFromApi } from "@/lib/api";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const data = await getProductBySlugFromApi(slug);
      setProduct(data);
      setLoading(false);
    }
    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-sm font-bold uppercase tracking-wider">
          Memuat detail produk...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
        <h1 className="text-2xl font-bold uppercase">Produk Tidak Ditemukan</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Produk yang Anda cari tidak tersedia di sistem.
        </p>
        <Link
          href="/products"
          className="mt-6 rounded-full bg-emerald-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-emerald-400"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const price = Number(product.price || product.base_price || 0);
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:8000/storage/${product.image.replace(/^\//, "")}`
    : "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800";

  const handleAddToCart = () => {
    addToCart({
      id: String(product.id || product.product_id),
      name: product.name,
      price: price,
      image: imageUrl,
      quantity: 1,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Nav Back */}
      <div className="border-b border-zinc-800/80 px-4 py-3 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Katalog
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Gambar Produk */}
          <div className="lg:col-span-5">
            <div className="relative flex max-h-[360px] w-full items-center justify-center overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4">
              <img
                src={imageUrl}
                alt={product.name}
                className="max-h-[320px] w-full object-contain transition-transform duration-300 hover:scale-105"
              />
              {product.category?.name && (
                <div className="absolute left-3 top-3 rounded-md bg-emerald-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-black">
                  {product.category.name}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-7">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                <Star
                  size={14}
                  fill="currentColor"
                  className="text-amber-400"
                />
                <span>5.0 (Produk pilihan)</span>
              </div>

              <h1 className="text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                {product.name}
              </h1>

              <p className="text-2xl font-black text-emerald-400">
                {formatIDR(price)}
              </p>

              <p className="text-xs leading-relaxed text-zinc-400 md:text-sm">
                {product.description ||
                  "Kacamata berkualitas premium dari IDVision dengan jaminan mutu terbaik."}
              </p>

              {/* Fitur Keunggulan */}
              <div className="grid grid-cols-2 gap-3 border-t border-zinc-800/80 pt-4">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <ShieldCheck
                    size={16}
                    className="shrink-0 text-emerald-400"
                  />
                  <span>Proteksi UV400</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Truck size={16} className="shrink-0 text-emerald-400" />
                  <span>Stok: {product.stock ?? 0} unit</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 border-t border-zinc-800/80 pt-5">
              <button
                onClick={handleBuyNow}
                className="flex-1 rounded-xl bg-emerald-500 py-3 text-xs font-extrabold uppercase tracking-widest text-black shadow-lg transition hover:bg-emerald-400 active:scale-95"
              >
                Beli Sekarang (Checkout)
              </button>
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 py-3 text-xs font-extrabold uppercase tracking-widest text-white transition hover:bg-zinc-800 active:scale-95"
              >
                <ShoppingBag size={16} />
                <span>+ Keranjang</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
