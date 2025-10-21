"use client";

import { useState } from "react";
import ClientPage from "@/app/project/quiz/components/ClientPage";
import Navigation from "@/app/project/quiz/components/Navigation";
import HambergerButton from "@/app/project/quiz/components/HambergerButton";

export default function QuizPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="min-h-[1000px] bg-gradient-to-b from-sky-100 via-rose-50 to-yellow-100">
      <div className="flex">
        <nav>
          <div className="hidden lg:block h-full">
            <Navigation />
          </div>
          <div className="block lg:hidden">
            <HambergerButton setIsNavOpen={setIsNavOpen} />
            <Navigation
              isNavOpen={isNavOpen}
              className={`${isNavOpen && "hidden lg:block"}`}
            />
          </div>
        </nav>

        <div
          className="m-4 p-6 rounded-3xl min-h-[750px] w-full lg:w-1/2 lg:mx-auto
          bg-gradient-to-tr from-sky-200 via-pink-200 to-amber-200 shadow-xl flex flex-col"
        >
          <header className="mb-6 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 drop-shadow">
              🎲 QUIZ POP!
            </h1>
            <p className="text-sm md:text-base text-gray-700 mt-2">
              AI 객관식 퀴즈 게임 🎉
            </p>
          </header>

          <main className="flex-1">
            <ClientPage />
          </main>

          <footer className="mt-6 text-center text-xs text-gray-600">
            © 2025 Quiz Pop!
          </footer>
        </div>
      </div>
    </div>
  );
}
