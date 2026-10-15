"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, Truck } from "lucide-react";

interface OrdersTabProps {
  orders: any[];
  loading: boolean;
}

export default function OrdersTab({ orders, loading }: OrdersTabProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-extrabold uppercase text-emerald-600 dark:text-emerald-400 mb-2">
        Daftar & Riwayat Belanja
      </h2>

      {loading ? (
        <div className="py-12 text-center text-xs text-zinc-500">
          Memuat riwayat pesanan...
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center space-y-3 bg-white dark:bg-zinc-950">
          <ShoppingBag
            size={40}
            className="mx-auto text-zinc-300 dark:text-zinc-700"
          />
          <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Belum ada riwayat pesanan.
          </p>
          <p className="text-[11px] text-zinc-400">
            Temukan kacamata impian Anda dan lakukan pemesanan pertama!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold uppercase text-black hover:bg-emerald-400 transition"
          >
            Mulai Belanja <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord: any, idx: number) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-5 shadow-xs space-y-3"
            >
              <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800/80 pb-3 text-xs">
                <div>
                  <span className="font-extrabold text-zinc-900 dark:text-white">
                    #{ord.order_number || ord.id}
                  </span>
                  <span className="text-zinc-400 text-[10px] ml-2">
                    {new Date(ord.created_at || Date.now()).toLocaleDateString(
                      "id-ID",
                    )}
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-emerald-500">
                  {ord.status || "Diproses"}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <div>
                  <p className="text-[10px] text-zinc-400">Metode Pembayaran</p>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 uppercase">
                    {ord.payment_method || "Midtrans"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-zinc-400">Total Bayar</p>
                  <p className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    Rp{" "}
                    {Number(
                      ord.total_amount || ord.price || ord.total_price || 0,
                    ).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* FITUR LACAK PESANAN LANGSUNG DARI RIWAYAT */}
              <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-3 mt-2">
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  No. Resi:{" "}
                  <strong className="text-zinc-800 dark:text-zinc-200">
                    {ord.tracking_number || "Belum Diterbitkan"}
                  </strong>
                </span>

                <Link
                  href={`/track?order=${ord.order_number || ord.id}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition"
                >
                  <Truck size={14} />
                  Lacak Pesanan
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
