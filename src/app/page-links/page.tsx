"use client";
import Content from "./components/Content";
import Search from "./components/Search";
import { useEffect, useState } from "react";
import { PaginatedLinkResponse } from "@/app/page-links/types";
import { getToLink } from "@/app/page-links/controllers/axiosLink";
import LoadingSpinner from "@/app/page-links/loading";
import NextPage from "@/app/page-links/components/NextPage";

export default function PageLinks() {
  const [links, setLinks] = useState<PaginatedLinkResponse | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getToLinkFunction = async () => {
      const links = await getToLink(1);
      setLinks(links);
      setTotalPages(links.totalPages);
    };
    getToLinkFunction();
  }, []);

  const handleSearch = async (search: string) => {
    setSearchValue(search);
    const links = await getToLink(1, search);
    setLinks(links);
    setTotalPages(links.totalPages);
  };
  const nextPage = async (page: number) => {
    const links = await getToLink(page, searchValue);
    setLinks(links);
  };
  if (!links) return <LoadingSpinner />;

  return (
    <>
      <Search handleSearch={handleSearch} />
      <Content links={links.data} />
      <NextPage
        pages={totalPages}
        currentPage={links.page}
        nextPage={nextPage}
      />
    </>
  );
}
