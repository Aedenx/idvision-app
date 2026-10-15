"use client";

import { Check, Package, Truck, CheckCircle2, Clock } from "lucide-react";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

interface TimelineProps {
  currentStatus: OrderStatus | string;
}

const STEPS = [
  {
    key: "pending",
    label: "Pesanan Dibuat",
    desc: "Menunggu / Pembayaran Dikonfirmasi",
    icon: Clock,
  },
  {
    key: "processing",
    label: "Dikemas",
    desc: "Barang sedang disiapkan & dikemas",
    icon: Package,
  },
  {
    key: "shipped",
    label: "Dalam Pengiriman",
    desc: "Kurir sedang mengantar pesananmu",
    icon: Truck,
  },
  {
    key: "completed",
    label: "Selesai",
    desc: "Pesanan telah diterima",
    icon: CheckCircle2,
  },
];

export default function OrderStatusTimeline({ currentStatus }: TimelineProps) {
  // Jika pesanan dibatalkan
  if (currentStatus === "cancelled") {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
        <p className="text-xs font-black uppercase text-red-500 tracking-wider">
          Pesanan Dibatalkan
        </p>
        <p className="text-[11px] text-zinc-400 mt-1">
          Pesanan ini telah dibatalkan dan tidak diproses lebih lanjut.
        </p>
      </div>
    );
  }

  // Menentukan indeks status saat ini
  const statusOrderIndex: Record<string, number> = {
    pending: 0,
    paid: 0,
    processing: 1,
    shipped: 2,
    completed: 3,
  };

  const currentIndex = statusOrderIndex[currentStatus] ?? 0;

  return (
    <div className="w-full py-4">
      {/* TIMELINE DESKTOP & MOBILE HORIZONTAL */}
      <div className="relative flex items-center justify-between w-full">
        {/* GARIS BACKGROUND (INACTIVE) */}
        <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 bg-zinc-200 dark:bg-zinc-800 z-0 rounded-full" />

        {/* GARIS PROGRESS BERANIMASI (ACTIVE) */}
        <div
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-emerald-500 z-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${(currentIndex / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {/* STEP NODES */}
        {STEPS.map((step, idx) => {
          const isPassed = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = step.icon;

          return (
            <div
              key={step.key}
              className="relative z-10 flex flex-col items-center group"
            >
              {/* LINGKARAN NODE BERANIMASI */}
              <div
                className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                  isPassed
                    ? "border-emerald-500 bg-emerald-500 text-black shadow-md shadow-emerald-500/20"
                    : isCurrent
                      ? "border-emerald-500 bg-zinc-950 text-emerald-400 scale-110 shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-500/20"
                      : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-400"
                }`}
              >
                {isPassed ? (
                  <Check size={18} className="stroke-[3]" />
                ) : (
                  <Icon
                    size={18}
                    className={isCurrent ? "animate-bounce duration-1000" : ""}
                  />
                )}

                {/* ANIMASI GLOW PULSE UNTUK STATUS AKTIF */}
                {isCurrent && (
                  <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping z-[-1]" />
                )}
              </div>

              {/* LABEL STATUS */}
              <div className="mt-3 text-center">
                <p
                  className={`text-[10px] md:text-xs font-black uppercase tracking-wider transition-colors duration-300 ${
                    isPassed || isCurrent
                      ? "text-emerald-500 dark:text-emerald-400"
                      : "text-zinc-400 dark:text-zinc-600"
                  }`}
                >
                  {step.label}
                </p>
                <p className="hidden md:block text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5 max-w-[120px]">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
