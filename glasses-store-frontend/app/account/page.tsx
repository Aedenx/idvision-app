"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Package, MapPin } from "lucide-react";

import AccountHeader from "./components/account-header";
import OrdersTab from "./components/orders-tab";
import AddressesTab, { Address } from "./components/addresses-tab";
import ProfileTab from "./components/profile-tab";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "orders" | "addresses" | "profile"
  >("orders");
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("customer_user");
    if (!savedUser) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(savedUser);
      setUser(userData);

      // Load Alamat
      const savedAddresses = localStorage.getItem(
        `customer_addresses_${userData.id || userData.user_id || userData.email}`,
      );
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      } else {
        setAddresses([
          {
            id: "addr_1",
            label: "Rumah",
            recipient_name:
              userData.name || userData.full_name || "Pelanggan IDVISION",
            phone: userData.phone || "08123456789",
            full_address:
              userData.address || "Belum menyetel alamat pengiriman.",
            is_primary: true,
          },
        ]);
      }

      // Fetch Orders
      fetchOrders(userData.id || userData.user_id || "", userData.email || "");
    } catch (e) {
      console.error("Gagal membaca sesi user", e);
      router.push("/login");
    }
  }, [router]);

  const fetchOrders = async (userId: string, email: string) => {
    setLoadingOrders(true);
    try {
      const res = await fetch(
        `http://localhost/idvision/backend/api/orders/get_user_orders.php?user_id=${userId}&email=${encodeURIComponent(
          email,
        )}`,
      );
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data)) {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Gagal mengambil pesanan:", err);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSaveAddresses = (newList: Address[]) => {
    setAddresses(newList);
    if (user) {
      const userKey = user.id || user.user_id || user.email;
      localStorage.setItem(
        `customer_addresses_${userKey}`,
        JSON.stringify(newList),
      );
      const primary = newList.find((a) => a.is_primary);
      if (primary) {
        const updatedUser = {
          ...user,
          address: primary.full_address,
          phone: primary.phone,
        };
        setUser(updatedUser);
        localStorage.setItem("customer_user", JSON.stringify(updatedUser));
      }
    }
  };

  const handleUpdateUser = (updatedUser: any) => {
    setUser(updatedUser);
    localStorage.setItem("customer_user", JSON.stringify(updatedUser));
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("customer_user");
      localStorage.removeItem("customer_token");
      router.push("/login");
    }
  };

  if (!user) {
    return (
      <div className="py-16 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Memuat data akun Anda...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      <AccountHeader user={user} onLogout={handleLogout} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* NAVIGASI TAB KIRI */}
        <div className="md:col-span-3 space-y-1">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold uppercase transition cursor-pointer ${
              activeTab === "orders"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            <Package size={16} /> Riwayat Pesanan
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold uppercase transition cursor-pointer ${
              activeTab === "addresses"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            <MapPin size={16} /> Alamat Pengiriman
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold uppercase transition cursor-pointer ${
              activeTab === "profile"
                ? "bg-emerald-500 text-black shadow-md shadow-emerald-500/10"
                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            }`}
          >
            <User size={16} /> Pengaturan Profil
          </button>
        </div>

        {/* AREA KONTEN KANAN */}
        <div className="md:col-span-9">
          {activeTab === "orders" && (
            <OrdersTab orders={orders} loading={loadingOrders} />
          )}
          {activeTab === "addresses" && (
            <AddressesTab
              addresses={addresses}
              onSave={handleSaveAddresses}
              user={user}
            />
          )}
          {activeTab === "profile" && (
            <ProfileTab user={user} onUpdate={handleUpdateUser} />
          )}
        </div>
      </div>
    </div>
  );
}
