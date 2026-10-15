"use client";

import { useState } from "react";

interface ProfileTabProps {
  user: any;
  onUpdate: (updatedUser: any) => void;
}

export default function ProfileTab({ user, onUpdate }: ProfileTabProps) {
  const [form, setForm] = useState({
    name: user?.name || user?.full_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [msg, setMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...user,
      name: form.name,
      full_name: form.name,
      email: form.email,
      phone: form.phone,
    };
    onUpdate(updated);
    setMsg("Profil berhasil diperbarui!");
    setTimeout(() => setMsg(""), 3000);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/60 p-6 shadow-xs space-y-6">
      <h2 className="text-sm font-extrabold uppercase text-emerald-600 dark:text-emerald-400">
        Ubah Informasi Profil Akun
      </h2>

      {msg && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          {msg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
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
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400 mb-1">
              Nomor WhatsApp
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-2.5 text-xs text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-black uppercase text-black hover:bg-emerald-400 transition cursor-pointer shadow-md shadow-emerald-500/10"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
