import Link from "next/link";
import { Ghost } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-white active:scale-90 hover:text-gray-400"
    >
      <Ghost className="h-10 w-10 md:h-12 md:w-12   transition-transform " />
      <span className=" text-xl font-bold hidden sm:block">임시로고</span>
    </Link>
  );
}
