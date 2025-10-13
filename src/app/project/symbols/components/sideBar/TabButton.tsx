"use client";

interface TabButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function TabButton({
  label,
  isSelected,
  onClick,
}: TabButtonProps) {
  return (
    <button
      type="button"
      className={`cursor-pointer border rounded-t-2xl px-2 py-1 w-28 text-center ${
        isSelected ? "bg-black text-white" : "bg-gray-600 text-white/70"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
