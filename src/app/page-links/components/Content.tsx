"use client";

import AddLink from "@/app/page-links/components/AddLink";
import LinkLists from "@/app/page-links/components/LinkLists";
import { LinkItem } from "@/app/page-links/types";

interface ContentProps {
  links: LinkItem[];
}

export default function Content({ links }: ContentProps) {
  return (
    <div className="border-2">
      <div className="grid grid-cols-3 p-4 gap-4 rounded-2xl">
        <AddLink />
        <LinkLists links={links} />
      </div>
    </div>
  );
}
