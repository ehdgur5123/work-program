import AddLink from "@/app/page-links/components/AddLink";
import LinkLists from "@/app/page-links/components/LinkLists";

export default function Content() {
  return (
    <div className="grid grid-cols-3 p-4 border-2 gap-4">
      <AddLink />
      <LinkLists />
    </div>
  );
}
