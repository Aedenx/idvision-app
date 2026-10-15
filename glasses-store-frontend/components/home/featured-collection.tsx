"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedCollection() {
  return (
    <section className="px-4 md:px-8 lg:px-14">
      <div className="relative h-[400px] w-full overflow-hidden rounded-2xl md:h-[500px]">
        {/* Background Image from Outdoor Gear Lab */}
        <img
          src="https://outdoorgearlab.b-cdn.net/photos/33/75/458999_11120_XXXL.jpg"
          alt="Smith Summit MIPS Helmet"
          className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end p-8 md:p-12">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-white">
                Outdoor Gear Review
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
              Gaya Petualang / Outdoor
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-gray-200 md:text-base">
             Proteksi mata maksimal dengan desain aerodinamis 
             yang kokoh. Dirancang khusus oleh Trail Blazer untuk performa luar ruangan tanpa batas.
            </p>

            {/* CTA Button */}
            <Link
              href="/products/trail-blazer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25"
            >
              Lihat Produk
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
