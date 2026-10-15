"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Code2,
  Layout,
  Mountain,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Truck,
  Target,
  GraduationCap,
  ArrowDown,
  Database,
  Smartphone,
} from "lucide-react";

// HOOK ANIMASI INTERSECTION OBSERVER
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function StoryBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-16 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const [stats, setStats] = useState({
    productsCount: 0,
    categoriesCount: 4,
  });

  useEffect(() => {
    fetch("http://localhost/idvision/backend/api/products/index.php")
      .then((res) => res.json())
      .then((resData) => {
        if (resData && resData.data) {
          setStats((prev) => ({
            ...prev,
            productsCount: resData.data.length || 12,
          }));
        }
      })
      .catch(() => {
        setStats((prev) => ({ ...prev, productsCount: 12 }));
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white transition-colors duration-300 overflow-x-hidden">
      {/* SECTION 1: HERO STORE & METRICS */}
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 md:px-8 py-12 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <StoryBlock
            className="lg:col-span-5 space-y-6 text-center lg:text-left"
            delay={100}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md">
              <Mountain className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                IDVISION Eyewear &bull; Est. 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[0.95]">
              VISION <br />
              WITHOUT <br />
              <span className="text-emerald-500 dark:text-emerald-400">
                LIMITS
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto lg:mx-0">
              Pusat e-commerce kacamata gaya dan outdoor kelas premium dengan
              proteksi{" "}
              <strong className="text-emerald-600 dark:text-emerald-400">
                UV400 penuh
              </strong>{" "}
              dan{" "}
              <strong className="text-emerald-600 dark:text-emerald-400">
                lensa polarized anti-glare
              </strong>
              .
            </p>

            <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-3.5 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 active:scale-95"
              >
                <span>Jelajahi Produk</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </StoryBlock>

          <StoryBlock
            className="lg:col-span-7 relative flex justify-center"
            delay={300}
          >
            <div className="relative w-full max-w-lg rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/80 p-4 shadow-2xl">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-800">
                <img
                  src="/images/summit-model.jpg"
                  alt="IDVISION Featured Eyewear"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800";
                  }}
                />

                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-1.5">
                    <Truck size={14} className="text-emerald-500" /> Siap Kirim
                    Hari Ini &bull; COD Available
                  </span>
                </div>
              </div>

              {/* STATS STRIP */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center border-t border-zinc-200 dark:border-zinc-800 pt-3">
                <div>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">
                    {stats.productsCount > 0
                      ? `${stats.productsCount}+`
                      : "12+"}
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Koleksi Ready
                  </p>
                </div>
                <div>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">
                    100%
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    UV400 Protection
                  </p>
                </div>
                <div>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">
                    4
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    Kategori Produk
                  </p>
                </div>
              </div>
            </div>
          </StoryBlock>
        </div>

        {/* INDIKATOR SCROLL KEBANWAH */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-400 animate-bounce hidden md:flex">
          <span className="text-[10px] font-extrabold uppercase tracking-widest">
            Scroll Cerita Kami
          </span>
          <ArrowDown size={14} />
        </div>
      </section>

      {/* SECTION 2: VISI & MISI TOKO */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-16 bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-5xl w-full space-y-12">
          <StoryBlock className="text-center space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">
              <Sparkles size={16} /> Fondasi IDVISION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Visi & Misi Utama Toko
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Komitmen kami dalam menghadirkan kacamata perlindungan optimal
              dengan aksesibilitas transaksi e-commerce modern.
            </p>
          </StoryBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CARD VISI */}
            <StoryBlock delay={200}>
              <div className="h-full rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-8 shadow-xl flex flex-col justify-between space-y-6 hover:border-emerald-500/50 transition">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Target size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-white">
                    Visi IDVISION
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Menjadi pilihan nomor satu brand kacamata lokal yang
                    memadukan keamanan fungsional lensa proteksi matahari tinggi
                    dengan estetika fashion pria, wanita, dan anak-anak.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <ShieldCheck size={16} /> 100% Quality & Style Driven
                </div>
              </div>
            </StoryBlock>

            {/* CARD MISI */}
            <StoryBlock delay={400}>
              <div className="h-full rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-8 shadow-xl flex flex-col justify-between space-y-6 hover:border-emerald-500/50 transition">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-white">
                    Misi IDVISION
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">&bull;</span>
                      Menyediakan lensa polarized UV400 dengan material frame
                      titanium ultra-ringan.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">&bull;</span>
                      Sistem pesanan otomatis dengan konfirmasi WhatsApp dan
                      opsi pembayaran COD.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">&bull;</span>
                      Layanan purna jual dan pengiriman cepat ke seluruh wilayah
                      Indonesia.
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-xs font-black text-emerald-600 dark:text-emerald-400 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <CheckCircle2 size={16} /> Customer Experience Guaranteed
                </div>
              </div>
            </StoryBlock>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROJECT BACKGROUND & DOSEN PENGAMPU */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-16 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-4xl w-full">
          <StoryBlock className="rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-gradient-to-br dark:from-zinc-900 dark:via-zinc-950 dark:to-black p-8 md:p-12 shadow-2xl space-y-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <GraduationCap size={24} />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Akademik & Pengawasan
                </span>
                <h2 className="text-2xl sm:text-3xl font-black uppercase text-zinc-900 dark:text-white">
                  Latar Belakang Proyek
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Platform e-commerce{" "}
              <strong className="text-zinc-900 dark:text-white">
                IDVISION
              </strong>{" "}
              dirancang dan dikembangkan secara intensif pada{" "}
              <strong className="text-emerald-600 dark:text-emerald-400">
                Awal Semester 8
              </strong>{" "}
              sebagai pemenuhan tugas proyek mata kuliah utama yang diampu oleh
              dosen pembimbing:
            </p>

            <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 tracking-widest">
                  Dosen Pengampu Mata Kuliah
                </p>
                <h3 className="text-xl font-black uppercase text-zinc-900 dark:text-white">
                  Ibu Rahmawaty, M.Kom
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Pembimbing Pengembangan E-Commerce
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Semester 8 Awal
              </span>
            </div>
          </StoryBlock>
        </div>
      </section>

      {/* SECTION 4: PROFIL LEAD BACKEND DEVELOPER (DENI SETIAWAN) */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-16 bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* FOTO DENI SETIAWAN */}
          <StoryBlock className="lg:col-span-5 flex justify-center" delay={100}>
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-4 border-emerald-500/30 bg-zinc-200 dark:bg-zinc-800 shadow-2xl group">
              <img
                src="/images/deni.jpg"
                alt="Deni Setiawan - Backend Developer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  Lead Backend
                </span>
                <p className="text-lg font-black uppercase mt-1">
                  Deni Setiawan
                </p>
              </div>
            </div>
          </StoryBlock>

          {/* DETAIL BACKEND */}
          <StoryBlock className="lg:col-span-7 space-y-6" delay={300}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400">
              <Code2 size={16} /> Backend & System Architect
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white leading-tight">
              Deni Setiawan
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bertanggung jawab penuh atas arsitektur sistem backend, keamanan
              data, serta kestabilan server platform IDVISION.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-4">
                <Database size={20} className="text-emerald-500 mb-2" />
                <h4 className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                  REST API & Database MySQL
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Pengelolaan struktur database produk, varian stok otomatis,
                  dan endpoint API berkecepatan tinggi.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-4">
                <Smartphone size={20} className="text-emerald-500 mb-2" />
                <h4 className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                  Payment & WhatsApp API
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Integrasi otomatisasi Midtrans Payment Gateway dan notifikasi
                  pesanan realtime via WhatsApp Fonnte.
                </p>
              </div>
            </div>
          </StoryBlock>
        </div>
      </section>

      {/* SECTION 5: PROFIL FRONTEND ENGINEER (MUHAMMAD IKHWAN) */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-16 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* DETAIL FRONTEND */}
          <StoryBlock
            className="lg:col-span-7 space-y-6 order-2 lg:order-1"
            delay={100}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-black uppercase text-sky-600 dark:text-sky-400">
              <Layout size={16} /> Frontend & UI/UX Specialist
            </div>

            <h2 className="text-3xl sm:text-4xl font-black uppercase text-zinc-900 dark:text-white leading-tight">
              Muhammad Ikhwan
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Bertanggung jawab pada perancangan antarmuka pengguna yang
              responsif, modern, intuitif, dan performatif di semua ukuran
              layar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-4">
                <Layout size={20} className="text-sky-500 mb-2" />
                <h4 className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                  Next.js & TypeScript
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Pengembangan komponen modern Next.js 16, TypeScript murni,
                  serta Cart Context interaktif.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/80 p-4">
                <Sparkles size={20} className="text-sky-500 mb-2" />
                <h4 className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                  Dual Theme & Eiger Style
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                  Implementasi Dark/Light mode dinamis, Hero Slider
                  Eiger-inspired, dan micro-animations.
                </p>
              </div>
            </div>
          </StoryBlock>

          {/* FOTO MUHAMMAD IKHWAN */}
          <StoryBlock
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
            delay={300}
          >
            <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden border-4 border-sky-500/30 bg-zinc-200 dark:bg-zinc-800 shadow-2xl group">
              <img
                src="/images/ikhwan.jpg"
                alt="Muhammad Ikhwan - Frontend Engineer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="rounded-full bg-sky-500 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  Frontend Specialist
                </span>
                <p className="text-lg font-black uppercase mt-1">
                  Muhammad Ikhwan
                </p>
              </div>
            </div>
          </StoryBlock>
        </div>
      </section>

      {/* SECTION 6: CALL TO ACTION FOOTER */}
      <section className="min-h-[50vh] flex flex-col justify-center items-center px-4 md:px-8 py-16 bg-zinc-900 text-white dark:bg-black">
        <StoryBlock className="max-w-4xl w-full text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Siap Menemukan Kacamata Pilihan Anda?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Nikmati kemudahan belanja kacamata gaya dan outdoor dengan
            pengiriman cepat, konfirmasi WhatsApp, dan metode COD.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/products"
              className="rounded-xl bg-emerald-500 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-black shadow-lg transition hover:bg-emerald-400 active:scale-95"
            >
              Katalog Produk
            </Link>
            <Link
              href="/store"
              className="rounded-xl border border-zinc-700 bg-zinc-800 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-zinc-700 active:scale-95"
            >
              Lokasi Toko
            </Link>
          </div>
        </StoryBlock>
      </section>
    </div>
  );
}
