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
      className="flex flex-col items-center gap-2 border-2 rounded-2xl p-4 w-full h-[200px] min-w-[150px] hover:bg-gray-500 active:scale-90"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className=" w-full text-center overflow-hidden line-clamp-1 text-[18px] ">
        {linkData.title}
      </div>
      <div className="bg-white rounded-2xl flex-grow w-full flex justify-center items-center">
        <div>
          {imageError ? (
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

      <div className="w-full text-center overflow-hidden line-clamp-1 text-sm">
        {linkData.category.large} | {linkData.category.medium} |{" "}
        {linkData.category.small}
      </div>
    </Link>
  );
}
