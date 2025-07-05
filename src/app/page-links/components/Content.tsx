"use client";

import AddLink from "@/app/page-links/components/AddLink";
import LinkLists from "@/app/page-links/components/LinkLists";
import NextPage from "./NextPage";
import { getToLink } from "@/app/page-links/controllers/axiosLink";
import { useEffect, useState } from "react";
// import links from "@/app/api/page-links/links.json";
import { PaginatedLinkResponse } from "@/app/page-links/types";
export default function Content() {
  const [links, setLinks] = useState<PaginatedLinkResponse | null>(null);

  useEffect(() => {
    const getToLinkFunction = async () => {
      const links = await getToLink(1);
      setLinks(links);
    };
    getToLinkFunction();
  }, []);

  if (!links) return <div>로딩</div>;

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
