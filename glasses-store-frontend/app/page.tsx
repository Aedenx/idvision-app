"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  ArrowRight,
  Sparkles,
  Award,
  Tag,
} from "lucide-react";
import RunningText from "@/components/home/running-text";
import HeroSlider from "@/components/layout/hero-slider";
import ProductCard from "@/components/product/product-card";

// Ambil Base URL dari Environment Variable Vercel dengan fallback ke domain InfinityFree
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ikhwanvision.freedev.app/backend/api";

export default function HomePage() {
  const [promoProducts, setPromoProducts] = useState<any[]>([]);
  const [popularProducts, setPopularProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch Produk untuk Promo & Terpopuler dari browser (Client-Side)
    fetch(`${API_BASE_URL}/products/index.php`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data) {
          const allProducts = resData.data;

          // Filter Produk Promo (diskon > 0), ambil maksimal 4 item
          const promo = allProducts
            .filter((p: any) => Number(p.discount_percent || 0) > 0)
            .slice(0, 4);

          // Ambil 4 produk terpopuler/teratas
          const popular = allProducts.slice(0, 4);

          setPromoProducts(promo.length > 0 ? promo : allProducts.slice(0, 4));
          setPopularProducts(popular);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data produk:", err);
        setLoading(false);
      });

    // 2. Fetch Kategori dari browser (Client-Side)
    fetch(`${API_BASE_URL}/categories/index.php`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data) {
          setCategories(resData.data);
        }
      })
      .catch((err) => console.error("Gagal mengambil data kategori:", err));
  }, []);

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white pb-16 space-y-12 transition-colors duration-300">
      {/* 1. HERO SLIDER BANNER PROMO */}
      <HeroSlider />

      {/* 2. RUNNING TEXT PROMO MARQUEE */}
      <RunningText />

      {/* 3. KATEGORI PILIHAN */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-base font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white md:text-lg flex items-center gap-2">
              <Sparkles
                size={18}
                className="text-emerald-500 dark:text-emerald-400"
              />{" "}
              Kategori Pilihan
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Temukan gaya kacamata ideal sesuai kebutuhan aktivitas Anda.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.length > 0
            ? categories.map((cat) => (
                <Link
                  key={cat.category_id || cat.id}
                  href={`/products?category=${cat.slug || cat.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition-all hover:border-emerald-500/60 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-900"
                >
                  <div className="flex flex-col justify-between h-20">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition">
                      {cat.name}
                    </span>
                    <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                      <span>Jelajahi</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1 text-emerald-500 dark:text-emerald-400"
                      />
                    </div>
                  </div>
                </Link>
              ))
            : [
                { name: "Outdoor & Summit", slug: "outdoor" },
                { name: "Polarized Solar", slug: "polarized" },
                { name: "Urban Lifestyle", slug: "urban" },
                { name: "Unisex Series", slug: "unisex" },
              ].map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/products?category=${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-4 transition-all hover:border-emerald-500/60 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:bg-zinc-900"
                >
                  <div className="flex flex-col justify-between h-20">
                    <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition">
                      {cat.name}
                    </span>
                    <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300">
                      <span>Jelajahi</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1 text-emerald-500 dark:text-emerald-400"
                      />
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </section>

      {/* 4. PROMO SPESIAL (1 BARIS DISKON) */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-base font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 md:text-lg flex items-center gap-2">
              <Tag size={18} className="text-red-500" /> Promo & Diskon Spesial
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Penawaran harga terbaik dengan diskon hemat terbatas.
            </p>
          </div>
          <Link
            href="/products?sort=discount_desc"
            className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
          >
            Lihat Promo <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-400">
            Memuat produk promo...
          </div>
        ) : promoProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {promoProducts.map((prod) => (
              <ProductCard key={prod.product_id || prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-zinc-400">
            Tidak ada produk promo saat ini.
          </div>
        )}
      </section>

      {/* 5. KOLEKSI KACAMATA TERPOPULER (1 BARIS TERLARIS) */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-6 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
            <h2 className="text-base font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white md:text-lg flex items-center gap-2">
              <Award
                size={18}
                className="text-emerald-500 dark:text-emerald-400"
              />{" "}
              Koleksi Kacamata Terpopuler
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Kacamata favorit paling banyak diminati dan terlaris.
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            Lihat Semua <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-zinc-400">
            Memuat produk terpopuler...
          </div>
        ) : popularProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularProducts.map((prod) => (
              <ProductCard key={prod.product_id || prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-zinc-400">
            Belum ada produk terpopuler.
          </div>
        )}
      </section>

      {/* 6. BANNER KEUNGGULAN IDVISION */}
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-black p-8 md:p-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                  100% Original
                </h3>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Lensa terproteksi UV400 penuh dengan material frame titanium &
                  acetate pilihan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                  Kirim Cepat & COD
                </h3>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Dukung metode pembayaran COD dan kurir ekspedisi instan ke
                  seluruh Indonesia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20">
                <RefreshCw size={24} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                  Garansi Kepuasan
                </h3>
                <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Jaminan ganti baru atau perbaikan jika terjadi cacat produksi
                  pada kacamata.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-400 border border-emerald-500/20">
                <Star size={24} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                  Update Notifikasi WA
                </h3>
                <p className="mt-1 text-[11px] text-zinc-400 leading-relaxed">
                  Lacak resi dan status pesanan otomatis langsung terhubung ke
                  WhatsApp Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
