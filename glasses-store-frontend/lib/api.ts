const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ikhwanvision.freedev.app/backend/api";

export async function getProducts(params?: {
  gender?: string;
  search?: string;
  page?: number;
}) {
  try {
    const queryParams = new URLSearchParams();

    if (params?.gender) {
      const g = params.gender.toLowerCase();
      if (g === "pria") queryParams.append("category", "men");
      else if (g === "wanita") queryParams.append("category", "women");
      else queryParams.append("category", g);
    }

    const url = `${BASE_URL}/products/index.php?${queryParams.toString()}`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return { data: [] };

    const result = await res.json();
    const rawData = result.data || [];

    // Map data API PHP ke format yang dibaca oleh ProductCard / Frontend
    let mappedData = rawData.map((item: any) => ({
      id: item.product_id,
      product_id: item.product_id,
      name: item.name,
      slug: item.slug,
      sku: item.sku_base,
      description: item.description,
      price: Number(item.base_price || 0),
      base_price: Number(item.base_price || 0),
      category: {
        name: item.category_name || "Unisex",
        slug: item.category_slug || "unisex",
      },
      category_name: item.category_name || "Unisex",
      image:
        item.image_url ||
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
      image_url:
        item.image_url ||
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
      stock: Number(item.total_stock || 0),
      is_featured: Boolean(item.is_featured),
    }));

    if (params?.search && Array.isArray(mappedData)) {
      const q = params.search.toLowerCase();
      mappedData = mappedData.filter(
        (p: any) =>
          p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q),
      );
    }

    return { data: mappedData };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: [] };
  }
}

export async function getProductBySlugFromApi(slugOrId: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/products/index.php?slug=${encodeURIComponent(slugOrId)}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const result = await res.json();
    const item = result.data;
    if (!item) return null;

    return {
      id: item.product_id,
      product_id: item.product_id,
      name: item.name,
      slug: item.slug,
      sku: item.sku_base,
      description: item.description,
      price: Number(item.base_price || 0),
      base_price: Number(item.base_price || 0),
      category: {
        name: item.category_name || "Unisex",
        slug: item.category_slug || "unisex",
      },
      category_name: item.category_name || "Unisex",
      image:
        item.image_url ||
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
      image_url:
        item.image_url ||
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
      stock: item.variants?.[0]?.stock_quantity ?? 15,
      variants: item.variants || [],
    };
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}

export async function getProductsFromApi() {
  const res = await getProducts();
  return res.data;
}

export async function getProductsApi() {
  const res = await getProducts();
  return res.data;
}

export async function getProductBySlugApi(slug: string) {
  return await getProductBySlugFromApi(slug);
}

export async function processCheckout(payload: {
  customer_name: string;
  customer_email?: string;
  customer_phone: string;
  address: string;
  items: Array<{
    id: number | string;
    product_id?: number | string;
    variant_id?: number;
    price: number;
    quantity: number;
  }>;
}) {
  try {
    const res = await fetch(`${BASE_URL}/orders/checkout.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error) {
    console.error("Error submitting checkout:", error);
    return { status: "error", message: "Gagal terhubung ke server checkout." };
  }
}
