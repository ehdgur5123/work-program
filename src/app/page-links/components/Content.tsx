import AddLink from "@/app/page-links/components/AddLink";
import LinkLists from "@/app/page-links/components/LinkLists";
import NextPage from "./NextPage";
import { getToLink } from "@/app/page-links/controllers/axiosLink";
// import links from '@/app/api/page-links/links.json'

export default async function Content() {
  const links = await getToLink(1);

  console.log(links);
  return (
    <div className="border-2">
      <div className="grid grid-cols-3 p-4 gap-4 rounded-2xl">
        <AddLink />
        <LinkLists links={links.data} />
      </div>
      <NextPage pages={links.totalPages} currentPage={links.page} />
    </div>
  );
}
