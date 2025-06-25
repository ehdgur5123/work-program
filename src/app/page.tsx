import Link from "next/link";

export default function Home() {
  const linkStyle =
    "p-2 border-1 text-center rounded-lg hover:bg-red-200 active:bg-red-300";
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-rows-2 grid-cols-3 gap-2 border-2 p-2">
        <Link href="/symbols" className={linkStyle}>
          기호찾기
        </Link>
      </div>
    </div>
  );
}
