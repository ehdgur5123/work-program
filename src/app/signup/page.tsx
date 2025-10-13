"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-800">
        {/* Title */}
        <h2 className="text-center text-3xl font-semibold text-white mb-8 tracking-tight">
          회원가입
        </h2>

        {/* Email */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">이메일</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">비밀번호</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-300 text-sm mb-2">
            비밀번호 확인
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full px-4 py-3 bg-gray-800/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-gray-200 to-white text-black rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          회원가입
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="text-gray-400 text-sm">또는</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>

        {/* SNS Signup */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => console.log("Google Signup")}
            className="flex items-center justify-center gap-3 bg-white text-gray-900 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            <span>Google 계정으로 가입</span>
          </button>
          <button
            onClick={() => console.log("Naver Signup")}
            className="flex items-center justify-center gap-3 bg-[#03C75A] text-white py-3 rounded-xl font-medium hover:bg-[#02b14f] transition"
          >
            <SiNaver size={22} />
            <span>Naver 계정으로 가입</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm pt-6">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-gray-200 hover:underline">
            로그인
          </a>
        </div>
      </div>
    </div>
  );
}
