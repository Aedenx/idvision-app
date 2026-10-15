"use client";

import Link from "next/link";
import { ArrowRight, Mountain } from "lucide-react";

export default function DashboardHero() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* CONTAINER HERO FIT SCREEN (100vh - tinggi navbar) */}
      <div className="relative h-[calc(100vh-4rem)] min-h-[500px] max-h-[750px] w-full flex items-center justify-between">
        {/* GAMBAR BACKGROUND MODEL FULL */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/summit-model.jpg"
            alt="Summit Collection Model"
            className="h-full w-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />

          {/* GRADASI SEAMLESS DUAL MODE */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/25 to-black dark:from-black/90 dark:via-black/30 dark:to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent hidden md:block" />
        </div>

        {/* KONTEN OVERLAY HERO */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 flex flex-col justify-between h-full">
          <div className="max-w-xl space-y-3.5 my-auto">
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3.5 py-1.5 backdrop-blur-md">
              <Mountain className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
                Summit Collection &bull; Est. 2026
              </span>
            </div>

            {/* HEADLINE */}
            <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] drop-shadow-2xl">
              Conquer <br />
              Every{" "}
              <span className="text-emerald-400 drop-shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                Peak
              </span>
            </h1>

            {/* DESKRIPSI */}
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed max-w-md drop-shadow">
              Kacamata outdoor pendakian dengan proteksi UV400 penuh, frame
              ultra-ringan, dan lensa polarized anti-refleksi. Siap menaklukkan
              setiap medan eksplorasi Anda.
            </p>

            {/* TOMBOL CTA */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                href="/products?collection=SUMMIT"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 active:scale-95"
              >
                <span>Lihat Koleksi</span>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-black/40 px-6 py-3 text-xs font-black uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/10 active:scale-95"
              >
                Semua Produk
              </Link>
            </div>
          </div>

          {/* STATS BADGE (DESKTOP) */}
          <div className="hidden md:flex items-center gap-8 pt-4 border-t border-white/10 max-w-lg mb-4">
            <div>
              <p className="text-xl font-black text-white">100%</p>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                UV400 Protection
              </p>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <p className="text-xl font-black text-white">Polarized</p>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Anti Glare Lens
              </p>
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div>
              <p className="text-xl font-black text-white">Ultra Light</p>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Titanium Frame
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
