"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Tag,
  Sparkles,
  Ticket,
  Copy,
  Check,
  Percent,
  Clock,
  ArrowRight,
} from "lucide-react";
import ProductCard from "@/components/product/product-card";

// DATA DUMMY VOUCHER DISKON
const VOUCHERS = [
  {
    id: 1,
    code: "SUMMIT2026",
    title: "Voucher Diskon Summit Outdoor",
    discount: "Diskon 20%",
    minPurchase: "Min. Belanja Rp 250.000",
    validUntil: "31 Des 2026",
    description:
      "Khusus pembelian kacamata kategori outdoor & pendakian gunung.",
  },
  {
    id: 2,
    code: "IDVISIONNEW",
    title: "Potongan Pelanggan Baru",
    discount: "Potongan Rp 30.000",
    minPurchase: "Min. Belanja Rp 150.000",
    validUntil: "30 Nov 2026",
    description:
      "Berlaku untuk semua jenis kacamata gaya Pria, Wanita, dan Kids.",
  },
  {
    id: 3,
    code: "POLARIZED50",
    title: "Promo Flash Polarized",
    discount: "Diskon 15%",
    minPurchase: "Tanpa Min. Belanja",
    validUntil: "15 Nov 2026",
    description: "Berlaku untuk semua koleksi kacamata polarized anti-glare.",
  },
];

export default function PromoPage() {
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    // Fetch produk promo dari API Backend IDVISION
    fetch("http://localhost/idvision/backend/api/products/index.php")
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data) {
          // Filter produk yang memiliki diskon (discount_percent > 0)
          const promo = resData.data.filter(
            (p: any) => Number(p.discount_percent || 0) > 0,
          );
          setDiscountedProducts(
            promo.length > 0 ? promo : resData.data.slice(0, 8),
          );
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white transition-colors duration-300 py-10 px-4 md:px-8">
      <main className="mx-auto max-w-7xl w-full space-y-12">
        {/* 1. HEADER PROMO SPESIAL */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 dark:text-red-400 border border-red-500/20">
              <Tag size={26} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-red-600 dark:text-red-400">
                <Sparkles size={14} /> IDVISION Promo Center
              </div>
              <h1 className="text-2xl font-black uppercase tracking-wider text-zinc-900 dark:text-white md:text-3xl">
                Voucher & Diskon Spesial
              </h1>
            </div>
          </div>
          <span className="inline-block rounded-full bg-red-500/10 border border-red-500/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400">
            Penawaran Terbatas
          </span>
        </section>

        {/* 2. DAFTAR VOUCHER DISKON (KARTU KLAIM VOUCHER) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
              <Ticket className="text-red-500" size={18} /> Kode Voucher Kupon
              Hemat
            </h2>
            <span className="text-xs text-zinc-400">
              Salin kode dan tempel saat checkout
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VOUCHERS.map((voucher) => (
              <div
                key={voucher.id}
                className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60 p-6 shadow-xs flex flex-col justify-between space-y-4 group transition hover:border-red-500/50"
              >
                {/* DEKORASI BENTUK KUPON DI SAMPING */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white dark:bg-black border-l border-zinc-200 dark:border-zinc-800" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-0.5 text-[10px] font-black uppercase text-red-600 dark:text-red-400 border border-red-500/20">
                      <Percent size={12} /> {voucher.discount}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                      <Clock size={12} /> s/d {voucher.validUntil}
                    </span>
                  </div>

                  <h3 className="text-sm font-black uppercase text-zinc-900 dark:text-white pt-1">
                    {voucher.title}
                  </h3>

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {voucher.description}
                  </p>

                  <p className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                    {voucher.minPurchase}
                  </p>
                </div>

                {/* AREA SALIN KODE */}
                <div className="pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-2">
                  <div className="rounded-xl bg-white dark:bg-zinc-950 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 font-mono text-xs font-black tracking-widest text-zinc-900 dark:text-zinc-200">
                    {voucher.code}
                  </div>

                  <button
                    onClick={() => copyToClipboard(voucher.code)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-red-500 px-3.5 py-1.5 text-[11px] font-extrabold uppercase text-white shadow-sm transition hover:bg-red-600 active:scale-95 cursor-pointer"
                  >
                    {copiedCode === voucher.code ? (
                      <>
                        <Check size={14} /> tersalin
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> salin
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. PRODUK DENGAN HARGA DISKON */}
        <section className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                <Tag size={18} className="text-red-500" /> Katalog Kacamata
                Promo
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Produk pilihan terbaik dengan potongan harga diskon langsung.
              </p>
            </div>

            <Link
              href="/products"
              className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Semua Produk <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-zinc-400">
              Memuat katalog promo...
            </div>
          ) : discountedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {discountedProducts.map((prod) => (
                <ProductCard key={prod.product_id || prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-zinc-400">
              Belum ada produk promo yang tersedia.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
