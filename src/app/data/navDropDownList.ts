// data/navDropDownList.ts
export interface NavItem {
  text: string;
  href: string;
  item?: { text: string; href: string }[]; // 하위 메뉴 (드롭다운)
}

export const navDropDownList: NavItem[] = [
  {
    text: "프로젝트",
    href: "/project",
    item: [
      { text: "기호검색", href: "/project/symbols" },
      { text: "즐겨찾기", href: "/project/page-links" },
      { text: "퀴즈 생성기", href: "/project/quiz" },
      { text: "카카오지도 테스트", href: "/project/map" },
    ],
  },
  { text: "서비스", href: "/service" },
  { text: "스케줄", href: "/schedule" },
];
