"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import React from "react";

interface LoginButtonProps {
  provider: "google" | "naver";
  className?: string;
}

export default function LoginButton({
  provider,
  className = "",
}: LoginButtonProps) {
  const { data: session } = useSession();

  // 각 provider에 맞는 스타일, 텍스트, 아이콘 자동 설정
  const config = {
    google: {
      text: "Google 계정으로 로그인",
      icon: <FcGoogle size={24} />,
      bg: "bg-white text-gray-900 hover:bg-gray-100",
    },
    naver: {
      text: "Naver 계정으로 로그인",
      icon: <SiNaver size={22} />,
      bg: "bg-[#03C75A] text-white hover:bg-[#02b14f]",
    },
  }[provider];

  // ✅ 로그인 상태면 로그아웃 버튼으로 변경
  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className={`flex items-center justify-center gap-3 py-3 rounded-xl font-medium transition bg-gray-200 hover:bg-gray-300 ${className}`}
      >
        <img
          src={session.user?.image || "/default-avatar.png"}
          alt="User Avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span>로그아웃</span>
      </button>
    );
  }

  // ✅ 로그인 안 되어 있으면 provider별 로그인 버튼 렌더링
  return (
    <button
      onClick={() => signIn(provider, { callbackUrl: "/" })}
      className={`flex items-center justify-center gap-3 py-3 rounded-xl font-medium transition ${config.bg} ${className}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </button>
  );
}
