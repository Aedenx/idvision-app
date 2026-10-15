"use client";

import { Sparkles, ShieldCheck, Truck, Zap } from "lucide-react";

const announcements = [
  { text: "FREE ONGKIR SELURUH INDONESIA", icon: Truck },
  { text: "GARANSI BIAYA GANTI RUGI 100% UV400 PROTECTION", icon: ShieldCheck },
  { text: "DISKON HINGGA 30% HARI INI", icon: Zap },
  { text: "ORIGINAL PREMIUM EYEWEAR", icon: Sparkles },
];

export default function RunningText() {
  return (
    <div className="w-full overflow-hidden bg-emerald-500/10 border-y border-emerald-500/20 py-3 text-emerald-400">
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {/* Render 2x perulangan agar animasi marquee tidak terputus (seamless loop) */}
        {[...announcements, ...announcements, ...announcements].map(
          (item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase"
              >
                <Icon size={14} className="text-emerald-400 shrink-0" />
                <span>{item.text}</span>
                <span className="text-emerald-500/40 ml-4">•</span>
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}
