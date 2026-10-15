"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, PackageCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";

function TrackOrderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderFromQuery = searchParams.get("order");

  const [orderNumber, setOrderNumber] = useState("");

  // OTO-REDIRECT JIKA ADA QUERY PARAMETER ?order=XXX
  useEffect(() => {
    if (orderFromQuery) {
      const cleanOrder = orderFromQuery.trim().toUpperCase();
      setOrderNumber(cleanOrder);
      router.push(`/checkout/success/${cleanOrder}`);
    }
  }, [orderFromQuery, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    router.push(`/checkout/success/${orderNumber.trim().toUpperCase()}`);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-12 md:px-8">
      {/* NAVIGASI KEMBALI */}
      <div className="mb-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali ke Akun
        </Link>
      </div>

      <div className="text-center">
        <PackageCheck size={52} className="mx-auto text-emerald-500 mb-3" />
        <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-3xl">
          Lacak Pesanan Anda
        </h1>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
          Masukkan nomor invoice transaksi (contoh: IDV-20261010-73AB) untuk
          memeriksa status pengiriman terkini.
        </p>

        <form onSubmit={handleSearch} className="mt-8 space-y-4">
          <div>
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="IDV-2026XXXX-XXXX"
              className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-4 text-center font-mono text-sm font-bold tracking-widest text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none uppercase placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:font-normal placeholder:text-zinc-400"
            />
          </div>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-3.5 text-xs font-extrabold uppercase tracking-widest text-black hover:bg-emerald-400 cursor-pointer transition shadow-md shadow-emerald-500/10"
          >
            <Search size={16} /> Cari Status Pesanan
          </button>
        </form>

        <p className="mt-6 text-[11px] text-zinc-400">
          Nomor invoice dapat ditemukan pada ringkasan transaksi setelah
          checkout atau konfirmasi WhatsApp.
        </p>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-16 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Memuat pelacakan pesanan...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
