"use client";
import Link from "next/link";
import { LinkItem } from "@/app/page-links/types";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
interface LinkListProps {
  linkData: LinkItem;
}

export default function LinkList({ linkData }: LinkListProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={linkData.url}
      className="flex items-center gap-2 border-2 rounded-2xl p-2 w-full hover:bg-gray-500 active:scale-90"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="p-2 h-20 w-20 bg-white rounded-2xl flex justify-center items-center">
        <div>
          {imageError || !linkData.logo ? (
            <EyeSlashIcon className="size-8 text-black" />
          ) : (
            <img
              src={linkData.logo}
              alt={linkData.title}
              className="h-[70px] w-[70px] object-cover rounded-md"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-auto">
        <div className=" w-full text-center overflow-hidden line-clamp-1 text-2xl ">
          {linkData.title}
        </div>
        <div className="w-full text-center overflow-hidden line-clamp-1 text-sm">
          {linkData.category.large} | {linkData.category.medium} |{" "}
          {linkData.category.small}
        </div>
      </div>
    </Link>
  );
}
