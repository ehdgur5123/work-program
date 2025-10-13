"use client";

import { useState } from "react";
import LoginButton from "@/app/components/nav/LoginButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-800">
        {/* Title */}
        <h2 className="text-center text-3xl font-semibold text-white mb-8 tracking-tight">
          로그인
        </h2>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-gray-200 to-white text-black rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          로그인
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="text-gray-400 text-sm">또는</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        {/* SNS Login */}
        <div className="flex flex-col gap-3">
          <LoginButton provider="google" />
          <LoginButton provider="naver" />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm pt-6">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-gray-200 hover:underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
