import ClientPage from "@/app/project/quiz/components/ClientPage";
import { requireSession } from "@/lib/auth/session";
import Navigation from "@/app/project/quiz/components/Navigation";
import HambergerButton from "@/app/project/quiz/components/HambergerButton";

export default async function QuizPage() {
  await requireSession();
  return (
    <div className="flex">
      <nav>
        <div className="hidden md:block">
          <Navigation />
        </div>
        <div className="block md:hidden">
          <HambergerButton />
        </div>
      </nav>
      <div
        className="m-4 p-6 rounded-3xl min-h-[500px] w-full md:w-1/2 md:mx-auto 
      bg-gradient-to-tr from-sky-200 via-pink-200 to-amber-200 shadow-xl flex flex-col"
      >
        {/* 헤더 */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 drop-shadow">
            🎲 QUIZ POP!
          </h1>
          <p className="text-sm md:text-base text-gray-700 mt-2">
            AI 객관식 퀴즈 게임 🎉
          </p>
        </header>

        {/* 메인 컨텐츠 */}
        <main className="flex-1">
          <ClientPage />
        </main>

        {/* 푸터(선택) */}
        <footer className="mt-6 text-center text-xs text-gray-600">
          © 2025 Quiz Pop!
        </footer>
      </div>
    </div>
  );
}
