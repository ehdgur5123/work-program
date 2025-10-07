"use client";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function HambergerButton() {
  return (
    <div className="fixed top-28 left-6 z-20">
      <button
        type="button"
        className="p-3 rounded-full bg-gradient-to-tr from-pink-400 via-amber-300 to-sky-300
      shadow-md shadow-black/20 active:scale-90 transition"
      >
        <Bars3Icon className="w-6 h-6 text-white drop-shadow-sm" />
      </button>
    </div>
  );
}
