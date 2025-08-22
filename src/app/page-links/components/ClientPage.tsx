"use client";
import Content from "@/app/page-links/components/Content";
import Search from "@/app/page-links/components/Search";
import { useEffect, useState } from "react";
import { PaginatedLinkResponse } from "@/app/page-links/types";
import { getToLink } from "@/app/page-links/controllers/axiosLink";
import LoadingSpinner from "@/app/page-links/loading";
import NextPage from "@/app/page-links/components/NextPage";
import DetailedSearch from "@/app/page-links/components/DetailedSearch";
import EmptyResult from "@/app/components/EmptyResult";
import ResetButton from "@/app/page-links/components/ResetButton";

type CategoryProps = {
  selectedLarge: string;
  selectedMedium: string;
  selectedSmall: string;
};

const initialCategory = {
  selectedLarge: "",
  selectedMedium: "",
  selectedSmall: "",
};

export default function PageLinks() {
  const [links, setLinks] = useState<PaginatedLinkResponse | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageState, setPageState] = useState(1);
  const [resetFlag, setResetFlag] = useState(false);
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const [category, setCategory] = useState<CategoryProps>(initialCategory);

  // 공통 fetch 함수
  const fetchLinks = async (
    page = 1,
    search = "",
    category: CategoryProps = initialCategory
  ) => {
    const {
      selectedLarge: large,
      selectedMedium: medium,
      selectedSmall: small,
    } = category;
    const links = await getToLink(page, search, large, medium, small);
    setLinks(links);
    setTotalPages(links.totalPages);
  };

  useEffect(() => {
    fetchLinks(1, "", category);
  }, [category]);

  useEffect(() => {
    fetchLinks(1, searchValue, category);
  }, [searchValue]);

  useEffect(() => {
    if (totalPages === 0) {
      setIsEmptyResult(true);
    } else {
      setIsEmptyResult(false);
    }
  }, [totalPages]);

  const handleReset = () => {
    setCategory(initialCategory);
    setPageState(1);
    setSearchValue("");
    fetchLinks(pageState, searchValue, initialCategory);
    setResetFlag((prev) => !prev);
  };

  const handleSearch = async (search: string) => {
    setSearchValue(search);
    setPageState(1);
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
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between p-2 gap-3">
        <ResetButton handleReset={handleReset} />
        <Search handleSearch={handleSearch} />
      </div>

      <DetailedSearch
        handleCategory={handleCategory}
        resetTrigger={resetFlag}
      />

      {!isEmptyResult ? <Content links={links.data} handleReset={handleReset}/> : <EmptyResult />}
      <NextPage
        pages={totalPages}
        currentPage={links.page}
        nextPage={nextPage}
      />
    </div>
  );
}
