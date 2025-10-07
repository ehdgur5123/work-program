"use client";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";
import Navigation from "@/app/quiz/components/Navigation";
export default function HambergerButton() {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <div className="fixed top-28 left-6 z-20">
      <button
        type="button"
        className="p-3 rounded-full bg-gradient-to-tr from-pink-400 via-amber-300 to-sky-300
      shadow-md shadow-black/20 active:scale-90 transition"
        onClick={() => setIsToggle((prev) => !prev)}
      >
        <Bars3Icon className="w-6 h-6 text-white drop-shadow-sm" />
      </button>
      {isToggle && <Navigation />}
    </div>
  );
}
