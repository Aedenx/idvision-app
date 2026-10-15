"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Check,
  Truck,
  ShoppingBag,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
  Star,
  Send,
  AlertTriangle,
} from "lucide-react";

// 1. IMPORT KOMPONEN TIMELINE BERANIMASI DI SINI
import OrderStatusTimeline from "@/components/order-status-timeline";

// KOMPONEN FORM ULASAN PER ITEM BARANG
function ReviewItemForm({
  orderId,
  productId,
  productName,
  customerName,
}: {
  orderId: number;
  productId: number;
  productName: string;
  customerName: string;
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setReviewError(null);

    try {
      const res = await fetch(
        "http://localhost/idvision/backend/api/reviews/create.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: orderId,
            product_id: productId,
            customer_name: customerName,
            rating,
            comment,
          }),
        },
      );

      const result = await res.json();
      if (result.status === "success") {
        setSubmitted(true);
      } else {
        setReviewError(result.message || "Gagal mengirimkan ulasan");
      }
    } catch (err) {
      setReviewError("Gagal terhubung ke server ulasan");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2">
        <CheckCircle2 size={16} /> Terima kasih! Ulasan Anda untuk "
        {productName}" berhasil dikirim.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmitReview}
      className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 space-y-3"
    >
      <div className="flex justify-between items-center">
        <p className="text-xs font-bold text-zinc-900 dark:text-white">
          {productName}
        </p>

        {/* RATING BINTANG */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-amber-400 transition transform hover:scale-110 focus:outline-none cursor-pointer"
            >
              <Star
                size={18}
                fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
      </div>

      <textarea
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Bagaimana kualitas frame dan lensa kacamata ini? Tulis ulasan Anda..."
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none placeholder:text-zinc-400 resize-none"
        rows={2}
      />

      {reviewError && (
        <p className="text-[11px] font-bold text-rose-500">{reviewError}</p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wider text-black hover:bg-emerald-400 transition cursor-pointer disabled:opacity-50"
        >
          {submitting ? (
            <RefreshCw size={14} className="animate-spin" />
          ) : (
            <Send size={14} />
          )}
          Kirim Ulasan
        </button>
      </div>
    </form>
  );
}

export default function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ order_number: string }>;
}) {
  const resolvedParams = use(params);
  const orderNumber = resolvedParams.order_number;

  const [copied, setCopied] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost/idvision/backend/api/orders/track.php?order_number=${orderNumber}`,
      );
      const result = await res.json();

      if (result.status === "success") {
        setOrder(result.data);
        setError(null);
      } else {
        setError(result.message || "Pesanan tidak ditemukan");
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderStatus();
  }, [orderNumber]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8">
      {/* HEADER NAVIGASI */}
      <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Kembali ke Katalog
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrderStatus}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:border-emerald-500 cursor-pointer transition"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />{" "}
            Refresh Status
          </button>
        </div>
      </div>

      {/* BANNER STATUS PESANAN */}
      <div className="mb-10 text-center">
        <CheckCircle2 size={56} className="mx-auto text-emerald-500 mb-3" />
        <h1 className="text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white md:text-3xl">
          Lacak Pesanan
        </h1>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Status dan rincian transaksi pesanan kacamata Anda.
        </p>

        {/* INVOICE CHIP */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
            Invoice:
          </span>
          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {orderNumber}
          </span>
          <button
            onClick={() => handleCopy(orderNumber)}
            className="ml-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition"
            title="Salin Invoice"
          >
            {copied ? (
              <Check size={14} className="text-emerald-500" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <RefreshCw className="animate-spin text-emerald-500" size={28} />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-center text-xs text-rose-500 flex items-center justify-center gap-2">
          <AlertCircle size={18} /> {error}
        </div>
      ) : (
        order && (
          <div className="space-y-10">
            {/* 2. KODE TIMELINE BARU DITARUH DI SINI menggantikan kode langkah lama */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-6">
                Status Pengiriman
              </h3>
              <OrderStatusTimeline
                currentStatus={order.order_status || order.status}
              />
            </div>

            {/* NOMOR RESI & CATATAN KENDALA */}
            {order.tracking_number && (
              <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400">
                <div className="flex items-center gap-2">
                  <Truck size={18} />
                  <span>
                    Nomor Resi Pengiriman:{" "}
                    <strong className="font-mono">
                      {order.tracking_number}
                    </strong>
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(order.tracking_number)}
                  className="font-bold underline cursor-pointer"
                >
                  Salin Resi
                </button>
              </div>
            )}

            {order.shipping_notes && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3 text-xs text-amber-600 dark:text-amber-400">
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-extrabold uppercase">
                    Catatan / Kendala Pengiriman:
                  </p>
                  <p className="mt-0.5">{order.shipping_notes}</p>
                </div>
              </div>
            )}

            {/* FITUR ULASAN PRODUK */}
            {order.order_status === "completed" && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <Star size={18} className="fill-emerald-500" /> Berikan
                    Ulasan Produk
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Pesanan Anda telah diterima! Berikan ulasan untuk kacamata
                    yang Anda beli.
                  </p>
                </div>

                <div className="space-y-4">
                  {order.items?.map((item: any, idx: number) => (
                    <ReviewItemForm
                      key={item.order_item_id || item.id || `review-${idx}`}
                      orderId={order.order_id}
                      productId={item.product_id || item.id}
                      productName={item.product_name}
                      customerName={order.customer_name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* DETIL PESANAN 2 KOLOM */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Kolom Kiri: Informasi Pengiriman & Pembayaran */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                    Informasi Pengiriman
                  </h3>
                  <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">
                      {order.customer_name}
                    </p>
                    <p>{order.customer_phone}</p>
                    <p>{order.customer_email}</p>
                    <p className="pt-2 text-zinc-500 leading-relaxed">
                      {order.shipping_address}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">
                    Metode Pembayaran
                  </h3>
                  <div className="space-y-1 text-xs text-zinc-600 dark:text-zinc-300">
                    <p className="font-bold uppercase text-zinc-900 dark:text-white">
                      {order.payment_method}
                    </p>
                    <p className="capitalize">
                      Status Bayar:{" "}
                      <span className="font-bold text-zinc-800 dark:text-zinc-200">
                        {order.payment_status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Rincian Produk & Total */}
              <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 pt-6 lg:pt-0 lg:pl-8">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-4">
                  Rincian Barang
                </h3>

                <div className="divide-y divide-zinc-200 dark:border-zinc-800/80">
                  {order.items?.map((item: any, idx: number) => (
                    <div
                      key={item.order_item_id || item.id || `item-${idx}`}
                      className="py-3 flex justify-between items-center text-xs"
                    >
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white">
                          {item.product_name}
                        </p>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          {item.quantity} x Rp{" "}
                          {Number(item.price).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="font-extrabold text-zinc-900 dark:text-white">
                        Rp {Number(item.subtotal).toLocaleString("id-ID")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                    Total Pembayaran:
                  </span>
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    Rp {Number(order.total_amount).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* FOOTER ACTION */}
      <div className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3 text-xs font-extrabold uppercase tracking-widest text-black hover:bg-emerald-400 transition shadow-md shadow-emerald-500/10"
        >
          <ShoppingBag size={16} /> Belanja Lagi
        </Link>
      </div>
    </div>
  );
}
