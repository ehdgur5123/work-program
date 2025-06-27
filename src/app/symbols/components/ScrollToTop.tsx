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
          className="fixed bottom-0 h-10 left-1/2 -translate-x-1/2 p-1 w-full text-center shadow-lg"
          style={{
            background:
              "linear-gradient(0deg,rgba(144, 166, 157, 0.9) 10%, rgba(227, 230, 232, 1) 50%, rgba(41, 110, 171, 0.9) 92%",
          }}
        >
          <button>
            <ChevronDoubleUpIcon className="size-6 text-gray-500 scroll-to-top" />
          </button>
        </div>
      )}
    </>
  );
}
