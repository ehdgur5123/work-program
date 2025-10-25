import { requireSession } from "@/lib/auth/session";
import ClientPage from "@/app/project/quiz/components/ClientPage";
import NavigationForm from "@/app/project/quiz/components/NavigationForm";

export default async function QuizPage() {
  await requireSession();
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-rose-50 to-yellow-100">
      <div className="flex">
        <NavigationForm />

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
