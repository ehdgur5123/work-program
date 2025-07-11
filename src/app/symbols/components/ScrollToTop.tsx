"use client";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤
    });
  };

  return (
    <>
      {isVisible && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-5 md:bottom-10 rounded-full right-5 md:right-90 h-12 w-12 p-2 text-center shadow-lg bg-gray-400 hover:scale-110
          active:scale-90"
        >
          <button>
            <ChevronDoubleUpIcon className="size-6 text-black scroll-to-top" />
          </button>
        </div>
      )}
    </>
  );
}
