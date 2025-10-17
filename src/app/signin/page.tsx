"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import AuthInput from "@/app/components/auth/AuthInput";
import AuthLayout from "@/app/components/auth/AuthLayout";
import AuthButton from "@/app/components/auth/AuthButton";
import AuthFooter from "@/app/components/auth/AuthFooter";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthLayout title="로그인">
      {/* Email */}
      <AuthInput
        label="이메일"
        id="email"
        type="email"
        handleChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="이메일을 입력하세요"
      />

      {/* Password */}
      <AuthInput
        label="비밀번호"
        id="password"
        type="password"
        handleChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="비밀번호를 입력하세요"
      />

      {/* Submit */}
      <AuthButton
        provider="normal"
        text="로그인"
        handleClick={() => console.log("응애")}
      />

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-grow h-px bg-gray-700" />
        <span className="text-gray-400 text-sm">또는</span>
        <div className="flex-grow h-px bg-gray-700" />
      </div>

      {/* SNS Login */}
      <div className="flex flex-col gap-3">
        <AuthButton
          provider="google"
          text="Google 계정으로 로그인"
          handleClick={() => signIn("google", { callbackUrl: "/" })}
        />
        <AuthButton
          provider="naver"
          text="Naver 계정으로 로그인"
          handleClick={() => console.log("응애")}
        />
      </div>

      {/* Footer */}
      <AuthFooter link="signin" />
    </AuthLayout>
  );
}
