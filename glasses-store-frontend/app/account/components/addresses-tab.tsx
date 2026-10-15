"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

export interface Address {
  id: string;
  label: string;
  recipient_name: string;
  phone: string;
  full_address: string;
  is_primary: boolean;
}

interface AddressesTabProps {
  addresses: Address[];
  onSave: (addresses: Address[]) => void;
  user: any;
}

export default function AddressesTab({
  addresses,
  onSave,
  user,
}: AddressesTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddr, setEditingAddr] = useState<Address | null>(null);
  const [form, setForm] = useState({
    label: "Rumah",
    recipient_name: "",
    phone: "",
    full_address: "",
    is_primary: false,
  });

  const openModal = (addr?: Address) => {
    if (addr) {
      setEditingAddr(addr);
      setForm({ ...addr });
    } else {
      setEditingAddr(null);
      setForm({
        label: "Rumah",
        recipient_name: user?.name || user?.full_name || "",
        phone: user?.phone || "",
        full_address: "",
        is_primary: addresses.length === 0,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...addresses];

    if (form.is_primary) {
      updated = updated.map((a) => ({ ...a, is_primary: false }));
    }

    if (editingAddr) {
      updated = updated.map((a) =>
        a.id === editingAddr.id ? { ...form, id: editingAddr.id } : a,
      );
    } else {
      updated.push({
        ...form,
        id: `addr_${Date.now()}`,
        is_primary: addresses.length === 0 ? true : form.is_primary,
      });
    }

    onSave(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Hapus alamat ini?")) return;
    const filtered = addresses.filter((a) => a.id !== id);
    if (filtered.length > 0 && !filtered.some((a) => a.is_primary)) {
      filtered[0].is_primary = true;
    }
    onSave(filtered);
  };

  const handleSetPrimary = (id: string) => {
    const updated = addresses.map((a) => ({ ...a, is_primary: a.id === id }));
    onSave(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-sm font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
            Alamat Pengiriman Saya
          </h2>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Alamat utama akan otomatis terisi saat melakukan checkout pesanan.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-bold uppercase text-black hover:bg-emerald-400 transition cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <Plus size={15} /> Tambah Alamat
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`relative rounded-2xl border p-5 transition bg-white dark:bg-zinc-900/60 ${
              addr.is_primary
                ? "border-emerald-500 ring-1 ring-emerald-500/20"
                : "border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {addr.is_primary && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[9px] font-black uppercase text-emerald-500">
                <CheckCircle2 size={11} /> Utama
              </span>
            )}

            <div className="space-y-2 text-xs">
              <span className="inline-block rounded-md bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-600 dark:text-zinc-400 uppercase">
                {addr.label}
              </span>
              <p className="font-extrabold text-zinc-900 dark:text-white">
                {addr.recipient_name}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-[11px]">
                {addr.phone}
              </p>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-[11px]">
                {addr.full_address}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/80 pt-3 text-[11px]">
              {!addr.is_primary ? (
                <button
                  onClick={() => handleSetPrimary(addr.id)}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Set Utama
                </button>
              ) : (
                <span className="text-zinc-400 italic">Alamat Default</span>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal(addr)}
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer transition"
                >
                  <Edit2 size={14} />
                </button>
                {addresses.length > 1 && (
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="p-1 text-zinc-400 hover:text-red-500 cursor-pointer transition"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FORM ALAMAT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-black uppercase text-zinc-900 dark:text-white">
              {editingAddr ? "Edit Alamat Pengiriman" : "Tambah Alamat Baru"}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Label Alamat
                </label>
                <select
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2.5 text-xs text-zinc-900 dark:text-white"
                >
                  <option value="Rumah">Rumah</option>
                  <option value="Kantor">Kantor</option>
                  <option value="Apartemen">Apartemen</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Nama Penerima
                </label>
                <input
                  type="text"
                  required
                  value={form.recipient_name}
                  onChange={(e) =>
                    setForm({ ...form, recipient_name: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2.5 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Nomor Telepon / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2.5 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.full_address}
                  onChange={(e) =>
                    setForm({ ...form, full_address: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-2.5 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_primary"
                  checked={form.is_primary}
                  onChange={(e) =>
                    setForm({ ...form, is_primary: e.target.checked })
                  }
                  className="rounded border-zinc-300 accent-emerald-500"
                />
                <label
                  htmlFor="is_primary"
                  className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer"
                >
                  Jadikan sebagai alamat utama
                </label>
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-emerald-500 py-2.5 text-xs font-black uppercase text-black hover:bg-emerald-400 transition cursor-pointer"
                >
                  Simpan Alamat
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-xs font-bold text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
