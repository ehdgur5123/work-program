"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function QuizDataLoading() {
  return (
    <div>
      <Skeleton
        className="w-full h-10"
        baseColor="#e0e0ef"
        highlightColor="#f5f5f5"
      />
      <Skeleton
        className="w-full h-50"
        baseColor="#e0e0ef"
        highlightColor="#f5f5f5"
      />
    </div>
  );
}
