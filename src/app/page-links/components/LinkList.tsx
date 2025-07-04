import Link from "next/link";
import { LinkItem } from "@/app/page-links/types";

interface LinkListProps {
  linkData: LinkItem;
}

export default function LinkList({ linkData }: LinkListProps) {
  return (
    <Link
      href={linkData.url}
      className="flex flex-col items-center gap-2 border-2 rounded-2xl p-4 w-full h-[200px] min-w-[150px] hover:bg-gray-500 active:scale-90"
    >
      <div className="bg-red-500 rounded-2xl flex-grow w-full flex justify-center items-center">
        <div>
          <img
            src={linkData.logo}
            alt="logo"
            className="h-[70px] w-[70px] object-cover rounded-md"
          />
        </div>
      </div>
      <div className="bg-blue-500 w-full text-center overflow-hidden line-clamp-1 text-sm">
        {linkData.title}
      </div>
      <div className="bg-green-500 w-full text-center overflow-hidden line-clamp-1 text-sm">
        {linkData.content}
      </div>
    </Link>
  );
}
