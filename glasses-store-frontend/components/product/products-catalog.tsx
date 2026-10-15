"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  ShoppingBag,
} from "lucide-react";
import { formatIDR } from "@/lib/store-types";
import { useCart } from "@/components/cart/cart-provider";

interface ProductsCatalogProps {
  products: any[];
  query?: string;
}

const ITEMS_PER_PAGE = 12;

export default function ProductsCatalog({
  products = [],
  query,
}: ProductsCatalogProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState(query || "");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Kategori Dinamis berdasarkan Produk dari Backend
  const categories = useMemo(() => {
    const categoryMap = new Map<string, string>();
    categoryMap.set("all", "Semua Kategori");

    products.forEach((p) => {
      const catName = p.category?.name || p.category_name;
      if (catName) {
        categoryMap.set(catName.toLowerCase(), catName);
      }
    });

    return Array.from(categoryMap.entries()).map(([slug, label]) => ({
      slug,
      label,
    }));
  }, [products]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam.toLowerCase());
    } else {
      setSelectedCategory("all");
    }
    setCurrentPage(1);
  }, [categoryParam]);

  // Filtering Produk berdasarkan Input Search & Kategori
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p) return false;

      const q = searchQuery.toLowerCase();
      const pName = p.name?.toLowerCase() ?? "";
      const pDesc = p.description?.toLowerCase() ?? "";
      const catName = (p.category?.name || p.category_name || "").toLowerCase();

      const matchesSearch =
        !searchQuery ||
        pName.includes(q) ||
        pDesc.includes(q) ||
        catName.includes(q);

      const cat = selectedCategory.toLowerCase();
      const matchesCategory = selectedCategory === "all" || catName === cat;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const startItem =
    filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredProducts.length,
  );

  return (
    <div className="min-h-screen bg-black px-4 py-8 md:px-8 lg:px-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
          Semua Produk
        </h1>
        <p className="mt-2 text-zinc-400">
          Jelajahi koleksi kacamata premium IDVISION
        </p>
      </div>

      {/* Dynamic Category Filter */}
      {categories.length > 1 && (
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter size={16} className="text-emerald-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => {
                setSelectedCategory(cat.slug);
                setCurrentPage(1);
              }}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.slug
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                  : "border border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Search & Reset */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari produk..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {(selectedCategory !== "all" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-emerald-400 transition hover:border-emerald-500 hover:text-emerald-300"
          >
            <X size={16} />
            Reset Filter
          </button>
        )}
      </div>

      {/* Jumlah Hasil */}
      <p className="mb-6 text-sm text-zinc-500">
        Menampilkan {startItem}-{endItem} dari {filteredProducts.length} produk
      </p>

      {/* Grid Produk */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id || product.product_id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-950">
          <Search size={48} className="mb-4 text-zinc-600" />
          <h3 className="text-lg font-bold text-white">
            Tidak ada produk ditemukan
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Produk belum tersedia atau tidak sesuai dengan kata kunci pencarian.
          </p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-white transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-bold text-white px-3">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="flex h-10 items-center gap-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 text-sm font-bold text-white transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  // URL Gambar dari Storage Laravel / External URL
  const getImageUrl = (imagePath?: string | null) => {
    if (!imagePath)
      return "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:8000/storage/${imagePath.replace(/^\//, "")}`;
  };

  const imageUrl = getImageUrl(product.image || product.primary_image);
  const price = Number(product.price || product.base_price || 0);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: String(product.id || product.product_id),
      name: product.name,
      price: price,
      image: imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-800/80 bg-[#111213] p-2.5 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
      <Link href={`/products/${product.slug}`} className="block flex-1">
        <div className="relative h-36 w-full overflow-hidden rounded-lg bg-zinc-900 md:h-40">
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=400&fit=crop";
            }}
          />
          {(product.category?.name || product.category_name) && (
            <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
              {product.category?.name || product.category_name}
            </span>
          )}
        </div>

        <div className="mt-2.5 px-1">
          <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-extrabold text-emerald-400">
            {formatIDR(price)}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleAddToCart}
        className="relative z-30 mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2 text-[11px] font-extrabold uppercase tracking-wider text-black transition hover:bg-emerald-400 active:scale-95 cursor-pointer"
      >
        <ShoppingBag size={13} />
        <span>+ Keranjang</span>
      </button>
    </div>
  );
}
