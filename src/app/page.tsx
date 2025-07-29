import Link from "next/link";

export default function Home() {
  const linkStyle =
    "p-2 border-1 text-center rounded-lg hover:bg-red-200 active:bg-red-300";
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-6xl min-w-[80px] mx-auto">
      <div className="grid grid-cols-1 gap-3 border-2 p-3 rounded-2xl w-full">
        <Link href="/symbol-search" className={linkStyle}>
          기호검색
        </Link>
        <Link href="/page-links" className={linkStyle}>
          인터넷 링크
        </Link>
      </div>
    </div>
  );
}
