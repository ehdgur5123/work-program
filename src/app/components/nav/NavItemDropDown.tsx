"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
export interface NavItemDropDownProps {
  text: string;
  items?: { text: string; href: string }[]; // 하위 메뉴 (optional)
  isMobile?: boolean;
}

export default function NavItemDropDown({
  text,
  items,
  isMobile = false,
}: NavItemDropDownProps) {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  // 모바일 드롭다운
  if (isMobile) {
    return (
      <div className="flex flex-col w-full">
        <button
          onClick={() => setToggle((prev) => !prev)}
          className="w-full text-left text-white py-2 px-4 hover:bg-gray-800 rounded-md transition flex gap-1 items-center"
        >
          {toggle && items ? (
            <ChevronDownIcon className="w-4 h-4 text-gray-300 group-hover:text-white transition" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-white transition" />
          )}
          {text}
        </button>
        {toggle && items && (
          <div className="flex flex-col ml-4">
            {items.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="w-full text-left text-gray-300 py-2 px-4 hover:bg-gray-700 rounded-md transition"
              >
                {sub.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 데스크톱 드롭다운
  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-1 text-lg text-gray-200 hover:text-white transition">
        {text}
        {items && (
          <ChevronDownIcon className="w-4 h-4 text-gray-300 group-hover:text-white transition" />
        )}
      </div>

      {items && (
        <div
          className={`absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-md rounded-md shadow-lg transition-opacity duration-200 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {items.map((sub) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 transition"
            >
              {sub.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
