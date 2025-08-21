"use client";
import LinkList from "./LinkList";
import { LinkItem } from "@/app/page-links/types";

interface LinkListsProps {
  links: LinkItem[];
}
export default function LinkLists({ links }: LinkListsProps) {
  return (
    <>
      {links.map((item: LinkItem) => (
        <LinkList linkData={item} key={item.url} />
      ))}
    </>
  );
}
