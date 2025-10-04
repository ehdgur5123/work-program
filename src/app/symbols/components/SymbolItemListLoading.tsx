"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function SymbolItemListLoading() {
  const isMobile = useIsMobile();

  return (
    <div className={`grid gap-2 ${isMobile ? "grid-cols-4" : "grid-cols-8"}`}>
      {Array.from({ length: 80 }).map((_, i) => (
        <Skeleton
          key={i}
          height={60}
          baseColor="#e0e0ef"
          highlightColor="#f5f5f5"
        />
      ))}
    </div>
  );
}
