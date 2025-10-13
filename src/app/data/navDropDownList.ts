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
      { text: "최근 프로젝트", href: "/project/recent" },
    ],
  },
  { text: "서비스", href: "/service" },
  { text: "스케줄", href: "/schedule" },
];
