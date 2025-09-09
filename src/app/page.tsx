import Link from "next/link";

export default function Home() {
  const projectList = [
    { title: "기호검색 버전1", href: "/symbol-search" },
    { title: "즐겨찾기", href: "/page-links" },
    { title: "지도검색", href: "/disaster-map" },
    { title: "테스트 코드", href: "/testcode" },
    { title: "기호검색 버전2", href: "/symbols" },
  ];
  const linkStyle =
    "p-2 border-1 text-center rounded-lg hover:bg-gray-500 active:scale-95";
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] max-w-6xl min-w-[80px] mx-auto">
      <div className="grid grid-cols-1 gap-3 border-2 p-3 rounded-2xl w-full">
        {projectList.map((item) => (
          <Link key={item.href} href={item.href} className={linkStyle}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
