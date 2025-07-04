import LinkList from "./LinkList";
import links from "@/app/api/page-links/links.json";

export default function LinkLists() {
  console.log(links);
  return (
    <>
      {links.map((item, index) => (
        <LinkList linkData={item} key={index} />
      ))}
    </>
  );
}
