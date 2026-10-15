"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  CreditCard,
  Truck,
  Check,
  MapPin,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

declare global {
  interface Window {
    snap: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"midtrans" | "cod">(
    "midtrans",
  );

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // 1. CEK LOGIN & AUTO-FILL DATA USER + ALAMAT UTAMA
  useEffect(() => {
    let savedUser =
      localStorage.getItem("customer_user") || localStorage.getItem("user");

    // Jika belum login, arahkan ke halaman login
    if (!savedUser) {
      router.push("/login");
      return;
    }

    try {
      let user =
        typeof savedUser === "string" ? JSON.parse(savedUser) : savedUser;
      if (typeof user === "string") {
        user = JSON.parse(user);
      }

      const userKey = user.id || user.user_id || user.email;

      // Cari alamat pengiriman tersimpan di localStorage
      let primaryAddress = user.address || user.shipping_address || "";
      const savedAddresses = localStorage.getItem(
        `customer_addresses_${userKey}`,
      );

      if (savedAddresses) {
        try {
          const addressList = JSON.parse(savedAddresses);
          if (Array.isArray(addressList) && addressList.length > 0) {
            const primaryObj =
              addressList.find((a: any) => a.is_primary) || addressList[0];
            if (primaryObj && primaryObj.full_address) {
              primaryAddress = primaryObj.full_address;
            }
          }
        } catch (err) {
          console.error("Gagal membaca daftar alamat tersimpan", err);
        }
      }

      setFormData({
        userId: user.id || user.user_id || "",
        name: user.name || user.full_name || user.customer_name || "",
        email: user.email || user.customer_email || "",
        phone: user.phone || user.customer_phone || "",
        address: primaryAddress,
      });
    } catch (e) {
      console.error("Gagal membaca data user dari localStorage", e);
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(
        "http://localhost/idvision/backend/api/orders/checkout.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: formData.userId,
            name: formData.name,
            customer_name: formData.name,
            email: formData.email,
            customer_email: formData.email,
            phone: formData.phone,
            customer_phone: formData.phone,
            address: formData.address,
            payment_method: paymentMethod,
            items: items.map((i) => ({
              id: i.id,
              product_id: i.id,
              name: i.name,
              quantity: i.quantity,
              price: i.price,
            })),
          }),
        },
      );

      const result = await res.json();

      if (result.status === "success" || result.success) {
        const orderNum = result.order_number || result.order_id;

        if (paymentMethod === "midtrans" && result.snap_token) {
          window.snap.pay(result.snap_token, {
            onSuccess: function () {
              clearCart();
              router.push(`/checkout/success/${orderNum}`);
            },
            onPending: function () {
              clearCart();
              router.push(`/checkout/success/${orderNum}`);
            },
            onError: function () {
              alert("Pembayaran Gagal / Dibatalkan");
            },
            onClose: function () {
              alert("Kamu menutup halaman pembayaran sebelum selesai.");
            },
          });
        } else {
          clearCart();
          router.push(`/checkout/success/${orderNum}`);
        }
      } else {
        alert(
          "Gagal memproses pesanan: " + (result.message || "Terjadi kesalahan"),
        );
      }
    } catch (error) {
      console.error("Gagal terhubung ke server:", error);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      {/* Skrip Snap Midtrans Sandbox */}
      <Script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key="Mid-client-oSTOoI2IP8SS3BYz"
        strategy="lazyOnload"
      />

      <div className="mb-6 flex items-center justify-between border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Lanjut Belanja
        </Link>
        <h1 className="text-lg font-black uppercase tracking-tight text-zinc-900 dark:text-white">
          Checkout Pesanan
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950 text-center">
          <ShoppingBag
            size={48}
            className="text-zinc-300 dark:text-zinc-700 mb-3"
          />
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
            Keranjang Anda Kosong
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Silakan tambahkan produk dari katalog terlebih dahulu.
          </p>
          <Link
            href="/products"
            className="mt-5 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold uppercase text-black hover:bg-emerald-400"
          >
            Lihat Katalog Produk
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Form Informasi Pengiriman & Metode Pembayaran */}
          <div className="lg:col-span-7 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/60 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
                Informasi Pemesan & Pengiriman
              </h2>
              <Link
                href="/account"
                className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <MapPin size={12} /> Kelola Alamat
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="nama@email.com"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                    Nomor WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                    placeholder="08123456789"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Alamat Lengkap Pengiriman
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  placeholder="Jalan, Nomor Rumah, RT/RW, Kecamatan, Kota, Kode Pos"
                />
              </div>

              {/* PILIHAN METODE PEMBAYARAN */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-3">
                  Pilih Metode Pembayaran
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Online Payment */}
                  <div
                    onClick={() => setPaymentMethod("midtrans")}
                    className={`cursor-pointer rounded-xl border p-3.5 flex items-center justify-between transition ${
                      paymentMethod === "midtrans"
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard size={18} />
                      <div>
                        <p className="text-xs font-extrabold uppercase">
                          Pembayaran Online
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          QRIS, VA Bank, GoPay
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "midtrans" && (
                      <Check size={16} className="text-emerald-500" />
                    )}
                  </div>

                  {/* Option 2: COD */}
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`cursor-pointer rounded-xl border p-3.5 flex items-center justify-between transition ${
                      paymentMethod === "cod"
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck size={18} />
                      <div>
                        <p className="text-xs font-extrabold uppercase">
                          COD (Bayar di Tempat)
                        </p>
                        <p className="text-[10px] text-zinc-500">
                          Bayar saat barang sampai
                        </p>
                      </div>
                    </div>
                    {paymentMethod === "cod" && (
                      <Check size={16} className="text-emerald-500" />
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full rounded-xl bg-emerald-500 py-3 text-xs font-extrabold uppercase tracking-widest text-black transition hover:bg-emerald-400 disabled:opacity-50 cursor-pointer shadow-md shadow-emerald-500/10"
              >
                {isSubmitting
                  ? "Memproses Pesanan..."
                  : paymentMethod === "cod"
                    ? `Buat Pesanan COD (Rp ${totalPrice.toLocaleString("id-ID")})`
                    : `Bayar Online (Rp ${totalPrice.toLocaleString("id-ID")})`}
              </button>
            </form>
          </div>

          {/* Ringkasan Produk */}
          <div className="lg:col-span-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/60 p-6 h-fit shadow-xs">
            <h2 className="text-sm font-extrabold uppercase mb-4 text-emerald-600 dark:text-emerald-400">
              Ringkasan Produk
            </h2>
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80 max-h-80 overflow-y-auto pr-1 scrollbar-hide">
              {items.map((item) => {
                const rawImage = item.image || "";
                const itemImage = rawImage.startsWith("http")
                  ? rawImage
                  : rawImage
                    ? `http://localhost/idvision/backend/uploads/products/${rawImage}`
                    : "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600";

                return (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <img
                      src={itemImage}
                      alt={item.name}
                      className="h-12 w-12 object-contain rounded-lg bg-zinc-50 dark:bg-zinc-950 p-1 border border-zinc-200 dark:border-zinc-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate text-zinc-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 font-extrabold">
                        Rp {Number(item.price).toLocaleString("id-ID")}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer transition"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 mt-4 pt-4 flex justify-between items-center text-xs font-black text-zinc-900 dark:text-white">
              <span>TOTAL BAYAR:</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-base">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
