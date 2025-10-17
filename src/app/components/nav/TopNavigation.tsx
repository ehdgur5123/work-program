"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Logo from "@/app/components/nav/Logo";
import NavItemDropDown from "@/app/components/nav/NavItemDropDown";
import { navDropDownList } from "@/app/data/navDropDownList";

export default function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();

  // 스크롤 시 그림자 효과
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black/90 shadow-lg backdrop-blur-sm" : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-20 text-gray-200">
          {navDropDownList.map((item) => (
            <NavItemDropDown
              key={item.href}
              text={item.text}
              isMobile={false}
              items={item.item}
            />
          ))}
        </nav>

        {/* 오른쪽 영역 */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <>
              <img
                src={session.user?.image || "/google-login-dark.svg"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm border border-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="text-sm border border-gray-400 text-white px-4 py-2 rounded-full hover:bg-gray-800"
              >
                회원가입
              </Link>
            </>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-gray-400 transition"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* 모바일 메뉴 패널 */}
      <div
        className={`md:hidden fixed top-20 right-0 w-2/3 h-[calc(100vh-5rem)] bg-black/95 backdrop-blur-md transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-start gap-6 p-6 text-gray-200">
          {navDropDownList.map((item) => (
            <NavItemDropDown
              key={item.href}
              text={item.text}
              isMobile={true}
              items={item.item}
            />
          ))}

          <div className="pt-4 border-t border-gray-700 w-full">
            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left text-white py-2 hover:text-gray-300"
              >
                로그아웃
              </button>
            ) : (
              <div className="flex flex-col items-start text-gray-200 text-lg">
                <Link
                  href="/signin"
                  className="w-full text-left text-white py-2 hover:text-gray-300"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="w-full text-left text-white py-2 hover:text-gray-300"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
