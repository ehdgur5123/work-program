"use client";
import LinkList from "./LinkList";
import { LinkItem } from "@/app/page-links/types";

interface LinkListsProps {
  links: LinkItem[];
  handleReset: () => void;
}
export default function LinkLists({ links, handleReset }: LinkListsProps) {
  return (
    <>
      {links.map((item: LinkItem) => (
        <LinkList linkData={item} key={item._id} handleReset={handleReset} />
      ))}
    </>
  );
}
