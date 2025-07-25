"use client";

import Link from "next/link";
import { Ghost } from "lucide-react";
import LoginButton from "./LoginButton";

export default function TopNavigation() {
  return (
    <div className="h-20 md:h-28 sticky top-0 z-50 w-full bg-black mb-20">
      <header className="max-w-6xl min-w-80 mx-auto flex justify-between items-center h-full">
        <Link href="/">
          <h1 className=" hover:text-gray-500 active:scale-90">
            <Ghost className="h-15 w-15 md:h-25 md:w-25 p-3" />
          </h1>
        </Link>
        <div className="flex gap-4 p-2">
          <LoginButton />
        </div>
      </header>
    </div>
  );
}
