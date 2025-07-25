"use client";
import Content from "@/app/page-links/components/Content";
import Search from "@/app/page-links/components/Search";
import { useEffect, useState } from "react";
import { PaginatedLinkResponse } from "@/app/page-links/types";
import { getToLink } from "@/app/page-links/controllers/axiosLink";
import LoadingSpinner from "@/app/page-links/loading";
import NextPage from "@/app/page-links/components/NextPage";
import DetailedSearch from "@/app/page-links/components/DetailedSearch";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
type CategoryProps = {
  large: string;
  medium: string;
  small: string;
};

export default function PageLinks() {
  const [links, setLinks] = useState<PaginatedLinkResponse | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageState, setPageState] = useState(1);
  const [resetFlag, setResetFlag] = useState(false);
  const [category, setCategory] = useState<CategoryProps>({
    large: "",
    medium: "",
    small: "",
  });

  // 공통 fetch 함수
  const fetchLinks = async (
    page = 1,
    search = "",
    category: CategoryProps = { large: "", medium: "", small: "" }
  ) => {
    const { large, medium, small } = category;
    const links = await getToLink(page, search, large, medium, small);
    setLinks(links);
    setTotalPages(links.totalPages);
  };

  useEffect(() => {
    fetchLinks(1, "", category);
  }, [category]);

  const resetSearch = () => {
    setCategory({ large: "", medium: "", small: "" });
    setPageState(1);
    setSearchValue("");
    fetchLinks(pageState, searchValue, { large: "", medium: "", small: "" });
    setResetFlag((prev) => !prev);
  };

  const handleSearch = async (search: string) => {
    setSearchValue(search);
    setPageState(1); // 검색 시 1페이지로 초기화
    await fetchLinks(1, search, category);
  };

  const nextPage = async (page: number) => {
    setPageState(page);
    await fetchLinks(page, searchValue, category);
  };

  const handleCategory = async (newCategory: CategoryProps) => {
    setCategory(newCategory);
    setPageState(1); // 카테고리 변경 시도 1페이지로 초기화
    await fetchLinks(1, searchValue, newCategory);
  };

  if (!links) return <LoadingSpinner />;

  return (
    <>
      <div className="flex items-center justify-end">
        <Search handleSearch={handleSearch} />
        <button className="p-2 border-2" onClick={resetSearch}>
          <ArrowPathRoundedSquareIcon className="size-4" />
        </button>
      </div>
      <DetailedSearch
        handleCategory={handleCategory}
        resetTrigger={resetFlag}
      />
      <Content links={links.data} />
      <NextPage
        pages={totalPages}
        currentPage={links.page}
        nextPage={nextPage}
      />
    </>
  );
}
