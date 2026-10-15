"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  MessageSquare,
  Zap,
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);

  // State Ulasan Pelanggan
  const [reviewSummary, setReviewSummary] = useState({
    average_rating: 0,
    total_reviews: 0,
    reviews: [],
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost/idvision/backend/api/products/detail.php?slug=${resolvedParams.slug}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && data.data) {
          const prod = data.data;
          setProduct(prod);

          const primaryImg =
            prod.images && prod.images.length > 0
              ? prod.images.find((img: any) => img.is_primary)?.image_path ||
                prod.images[0].image_path
              : prod.image;

          setSelectedImage(
            primaryImg
              ? primaryImg.startsWith("http")
                ? primaryImg
                : `http://localhost/idvision/backend/uploads/products/${primaryImg}`
              : "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
          );

          if (prod.variants && prod.variants.length > 0) {
            setSelectedVariant(prod.variants[0]);
          }

          // Fetch Ulasan Pelanggan untuk produk ini
          fetch(
            `http://localhost/idvision/backend/api/reviews/get_by_product.php?product_id=${prod.product_id}`,
          )
            .then((res) => res.json())
            .then((revData) => {
              if (revData && revData.status === "success") {
                setReviewSummary(revData.data);
              }
            })
            .catch(() => {});
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Memuat detail produk...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-sm font-bold text-zinc-900 dark:text-white">
          Produk Tidak Ditemukan
        </h2>
        <Link
          href="/products"
          className="mt-3 inline-block rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  const originalPrice = Number(
    selectedVariant?.price || product.base_price || 0,
  );
  const discountPercent = Number(product.discount_percent || 0);
  const finalPrice = product.discount_price
    ? Number(product.discount_price)
    : discountPercent > 0
      ? originalPrice - (originalPrice * discountPercent) / 100
      : originalPrice;

  const currentStock = Number(
    selectedVariant?.stock_quantity ?? product.total_stock ?? 0,
  );

  // LOGIKA TAMBAH KE KERANJANG DENGAN PROTEKSI WAJIB LOGIN
  const handleAddToCart = (redirectAfterAdd = false) => {
    const savedUser = localStorage.getItem("customer_user");

    if (!savedUser) {
      alert("Silakan login terlebih dahulu untuk melanjutkan pembelian.");
      router.push("/login");
      return;
    }

    if (currentStock <= 0) return;

    const cartItemId = selectedVariant?.variant_id
      ? `${product.product_id}-${selectedVariant.variant_id}`
      : String(product.product_id);

    addToCart({
      id: cartItemId,
      name: `${product.name} ${selectedVariant ? `(${selectedVariant.color_name || selectedVariant.sku_variant})` : ""}`,
      price: finalPrice,
      image: selectedImage,
      quantity: 1,
    });

    if (redirectAfterAdd) {
      router.push("/checkout");
    } else {
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-6">
      {/* Tombol Kembali Ringkas */}
      <Link
        href="/products"
        className="mb-4 inline-flex items-center gap-1 text-[11px] font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        <ArrowLeft size={14} /> Kembali
      </Link>

      {/* Grid Kompak Produk */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 items-start">
        {/* GALERI GAMBAR */}
        <div className="space-y-2.5">
          <div className="relative aspect-square w-full max-w-[380px] mx-auto overflow-hidden rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900/60 flex items-center justify-center">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-contain"
            />
            {discountPercent > 0 && (
              <span className="absolute right-2.5 top-2.5 rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-black text-white">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Thumbnail Kompak */}
          {product.images && product.images.length > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto scrollbar-hide">
              {product.images.map((img: any, idx: number) => {
                const imgUrl = img.image_path.startsWith("http")
                  ? img.image_path
                  : `http://localhost/idvision/backend/uploads/products/${img.image_path}`;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`h-12 w-12 shrink-0 rounded-lg border p-0.5 bg-white dark:bg-zinc-900 cursor-pointer ${
                      selectedImage === imgUrl
                        ? "border-emerald-500 ring-1 ring-emerald-500/20"
                        : "border-zinc-200 dark:border-zinc-800 opacity-60"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* INFORMASI PRODUK */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                {product.category_name || "Unisex"}
              </span>
              <span className="text-[10px] text-zinc-400">
                SKU: {product.sku_base}
              </span>
            </div>

            <h1 className="mt-1.5 text-lg font-extrabold uppercase text-zinc-900 dark:text-white">
              {product.name}
            </h1>

            {/* RINGKASAN BINTANG RATING */}
            <div className="mt-1 flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    fill={
                      reviewSummary.average_rating >= star
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-xs font-extrabold text-zinc-900 dark:text-white">
                {reviewSummary.average_rating}
              </span>
              <span className="text-[11px] text-zinc-400">
                ({reviewSummary.total_reviews} ulasan)
              </span>
            </div>

            {/* Harga */}
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                Rp {finalPrice.toLocaleString("id-ID")}
              </span>
              {discountPercent > 0 && originalPrice > 0 && (
                <span className="text-xs font-semibold text-zinc-400 line-through">
                  Rp {originalPrice.toLocaleString("id-ID")}
                </span>
              )}
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 line-clamp-3">
              {product.description ||
                "Kacamata idvision dirancang dengan presisi tinggi untuk kenyamanan maksimal."}
            </p>
          </div>

          {/* Varian Warna */}
          {product.variants && product.variants.length > 0 && (
            <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
              <label className="text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400">
                Varian:
              </label>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {product.variants.map((v: any) => {
                  const isSelected =
                    selectedVariant?.variant_id === v.variant_id;
                  return (
                    <button
                      key={v.variant_id}
                      onClick={() => setSelectedVariant(v)}
                      className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase cursor-pointer ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                      }`}
                    >
                      {v.color_name || v.sku_variant}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Stok Info */}
          <div className="text-[11px]">
            <span className="font-medium text-zinc-500 dark:text-zinc-400">
              Stok:{" "}
            </span>
            {currentStock > 0 ? (
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currentStock} pcs
              </span>
            ) : (
              <span className="font-bold text-red-500">Habis</span>
            )}
          </div>

          {/* Tombol Aksi (+ Keranjang & Beli Sekarang) */}
          <div className="border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
            <div className="grid grid-cols-2 gap-2">
              {/* Tombol Tambah ke Keranjang */}
              <button
                onClick={() => handleAddToCart(false)}
                disabled={currentStock <= 0}
                className={`w-full flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold uppercase cursor-pointer transition ${
                  isAdded
                    ? "bg-zinc-800 text-emerald-400 border border-emerald-500"
                    : currentStock > 0
                      ? "border border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                      : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed border-none"
                }`}
              >
                {isAdded ? <Check size={15} /> : <ShoppingBag size={15} />}
                {isAdded ? "Ditambahkan" : "+ Keranjang"}
              </button>

              {/* Tombol Beli Sekarang */}
              <button
                onClick={() => handleAddToCart(true)}
                disabled={currentStock <= 0}
                className={`w-full flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-bold uppercase cursor-pointer transition ${
                  currentStock > 0
                    ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-md shadow-emerald-500/10"
                    : "bg-zinc-200 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600 cursor-not-allowed"
                }`}
              >
                <Zap size={15} />
                Beli Sekarang
              </button>
            </div>

            {/* Jaminan Singkat */}
            <div className="mt-3 grid grid-cols-3 gap-1 text-center text-[9px] font-medium text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck size={12} className="text-emerald-500" /> 100% Ori
              </div>
              <div className="flex items-center justify-center gap-1">
                <Truck size={12} className="text-emerald-500" /> Kirim Cepat
              </div>
              <div className="flex items-center justify-center gap-1">
                <RefreshCw size={12} className="text-emerald-500" /> Garansi
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION DAFTAR ULASAN PELANGGAN */}
      <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-extrabold uppercase text-zinc-900 dark:text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-emerald-500" /> Ulasan
              Pelanggan
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Pengalaman nyata dari pembeli yang telah memiliki kacamata ini.
            </p>
          </div>
        </div>

        {/* DAFTAR ULASAN */}
        <div className="space-y-3">
          {reviewSummary.reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 p-6 text-center text-xs text-zinc-400">
              Belum ada ulasan untuk kacamata ini. Jadilah yang pertama
              memberikan ulasan setelah membeli!
            </div>
          ) : (
            reviewSummary.reviews.map((rev: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1.5"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-zinc-900 dark:text-white">
                    {rev.customer_name}
                  </span>
                  <span className="text-[10px] text-zinc-400">
                    {new Date(rev.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      fill={rev.rating >= star ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
