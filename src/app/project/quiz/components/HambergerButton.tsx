"use client";
import { Bars3Icon } from "@heroicons/react/24/solid";

interface HambergerButtonProps {
  setIsNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}
export default function HambergerButton({
  setIsNavOpen,
  className,
}: HambergerButtonProps) {
  return (
    <div className={`fixed top-[90px] left-6 z-30 ${className}`}>
      <button
        type="button"
        className="p-3 rounded-full bg-gradient-to-tr from-pink-400 via-amber-300 to-sky-300
      shadow-md shadow-black/20 active:scale-90 transition"
        onClick={() => setIsNavOpen((prev) => !prev)}
      >
        <Bars3Icon className="w-6 h-6 text-white drop-shadow-sm" />
      </button>
    </div>
  );
}
