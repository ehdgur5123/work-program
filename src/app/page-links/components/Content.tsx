"use client";

import AddLink from "@/app/page-links/components/AddLink";
import LinkLists from "@/app/page-links/components/LinkLists";
import { LinkItem } from "@/app/page-links/types";

interface ContentProps {
  links: LinkItem[];
  handleReset: () => void;
}

export default function Content({ links, handleReset }: ContentProps) {
  return (
    <div className="border-2 min-h-[450px] rounded-2xl">
      <div className="flex flex-col p-4 gap-4 rounded-2xl">
        <AddLink />
        <LinkLists links={links} handleReset={handleReset}/>
      </div>
    </div>
  );
}
