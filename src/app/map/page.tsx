import { requireSession } from "@/lib/auth/session";
import ClientPage from "@/app/map/components/ClientPage";

export default async function MapPage() {
  await requireSession();

  return (
    <div
      className="m-4 p-6 rounded-3xl min-h-[500px] md:w-1/2 md:mx-auto
      bg-gradient-to-tr from-sky-800 via-cyan-950 to-green-800 shadow-2xl flex flex-col text-white"
    >
      {/* 헤더 */}
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-600 drop-shadow">
          지도 테스트
        </h1>
        <p className="text-sm md:text-base text-pink-400 mt-2">feat. KAKAO</p>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="flex-1">
        <ClientPage />
      </main>

      {/* 푸터(선택) */}
      <footer className="mt-6 text-center text-xs text-gray-600">
        © 2025 KAKAO MAP
      </footer>
    </div>
  );
}
