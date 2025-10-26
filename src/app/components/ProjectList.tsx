import Link from "next/link";
import { navDropDownList } from "@/app/data/navDropDownList";

export default function ProjectList() {
  const linkStyle =
    "p-2 border-1 text-center rounded-lg hover:bg-gray-500 active:scale-95";

  return (
    <div className="max-w-3xl m-auto">
      <div className="grid grid-cols-1 gap-3 border-2 p-3 rounded-2xl w-full">
        {navDropDownList[0]?.item?.map((item) => (
          <Link key={item.href} href={item.href} className={linkStyle}>
            {item.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
