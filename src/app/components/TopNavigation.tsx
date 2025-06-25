"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

export default function TopNavigation() {
  return (
    <header className="flex justify-between items-center px-6 py-4 h-20 sticky top-0 z-50 bg-black mb-20">
      <Link href="/">
        <h1 className="p-2">로고</h1>
      </Link>
      <div className="flex gap-3 p-2">
        <SignedOut>
          <SignInButton>
            <button className="border-1 p-1 text-sm">Sign in</button>
          </SignInButton>

          <SignUpButton>
            <button className="border-1 p-1 text-sm">Sign up</button>
          </SignUpButton>
        </SignedOut>
      </div>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
