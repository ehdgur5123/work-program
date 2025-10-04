"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import useIsMobile from "@/app/hooks/useIsMobile";
import SideBarForm from "@/app/symbols/components/sideBar/SideBarForm";

export default function SideBarControl() {
  const [isSideBar, setIsSideBar] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && (
        <div className="sticky top-[15%] self-start right-0 border-2 rounded-l-2xl">
          <button
            className="cursor-pointer p-2 h-32"
            onClick={() => setIsSideBar(!isSideBar)}
          >
            {isSideBar ? (
              <ChevronRightIcon className="size-6" />
            ) : (
              <ChevronLeftIcon className="size-6" />
            )}
          </button>
        </div>
      )}
      {isMobile
        ? null
        : isSideBar && (
            <div className="w-1/3 border-4 min-w-[440px]">
              <SideBarForm />
            </div>
          )}
    </>
  );
}
