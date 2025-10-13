import Link from "next/link";

export default function Home() {
  const projectList = [
    { title: "기호검색 버전1", href: "/symbol-search" },
    { title: "즐겨찾기", href: "/page-links" },
    { title: "기호검색 버전2", href: "/symbols" },
    { title: "QUIZ 생성기", href: "/quiz" },
    { title: "지도검색 테스트", href: "/map" },
  ];
  const linkStyle =
    "p-2 border-1 text-center rounded-lg hover:bg-gray-500 active:scale-95";
  return (
    <div className="max-w-3xl m-auto">
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
