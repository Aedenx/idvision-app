"use client";

import { LogOut } from "lucide-react";

interface AccountHeaderProps {
  user: any;
  onLogout: () => void;
}

export default function AccountHeader({ user, onLogout }: AccountHeaderProps) {
  const initial = (user?.name || user?.full_name || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-xl font-black text-black">
          {initial}
        </div>
        <div>
          <h1 className="text-lg font-black uppercase text-zinc-900 dark:text-white">
            {user?.name || user?.full_name || "Pelanggan IDVISION"}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2 mt-0.5">
            <span>{user?.email}</span> &bull;{" "}
            <span>{user?.phone || "No HP Belum Diisi"}</span>
          </p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-bold uppercase text-red-600 dark:text-red-400 hover:bg-red-500/20 transition cursor-pointer w-fit"
      >
        <LogOut size={15} /> Keluar Akun
      </button>
    </div>
  );
}
