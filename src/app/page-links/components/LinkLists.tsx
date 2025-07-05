import LinkList from "./LinkList";
import { LinkItem } from "@/app/page-links/types";

interface LinkListsProps {
  links: LinkItem[];
}
export default async function LinkLists({ links }: LinkListsProps) {
  return (
    <>
      {links.map((item: LinkItem) => (
        <LinkList linkData={item} key={item.url} />
      ))}
    </>
  );
}
