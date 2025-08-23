"use client";
import Content from "@/app/page-links/components/Content";
import Search from "@/app/page-links/components/Search";
import { useState } from "react";
import { CategoryProps } from "@/app/page-links/types";
import LoadingSpinner from "@/app/page-links/loading";
import NextPage from "@/app/page-links/components/NextPage";
import DetailedSearch from "@/app/page-links/components/DetailedSearch";
import EmptyResult from "@/app/components/EmptyResult";
import ResetButton from "@/app/page-links/components/ResetButton";
import useLinks from "@/app/page-links/hooks/useLinks";
import { Toaster } from "react-hot-toast";

export default function PageLinks() {
  const {
    setSearchValue,
    setPageState,
    setCategory,
    paginatedLinks,
    isLoading,
    isError,
    searchValue,
    resetFilters,
  } = useLinks();
  const [resetFlag, setResetFlag] = useState(false);

  const handleReset = () => {
    resetFilters();
    setResetFlag(!resetFlag);
  };

  const handleSearch = (search: string) => {
    resetFilters();
    setSearchValue(search);
    setPageState(1);
  };

  const nextPage = (page: number) => {
    setPageState(page);
  };

  const handleCategory = (newCategory: CategoryProps) => {
    setCategory(newCategory);
    setPageState(1);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const totalPages = paginatedLinks?.totalPages ?? 0;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between p-2 gap-3">
        <ResetButton handleReset={handleReset} />
        <Search handleSearch={handleSearch} />
      </div>

      {!searchValue ? (
        <DetailedSearch handleCategory={handleCategory} resetFlag={resetFlag} />
      ) : (
        <div className="text-2xl p-3">검색결과 : {searchValue}</div>
      )}

      {totalPages !== 0 ? (
        <Content links={paginatedLinks?.data ?? []} />
      ) : (
        <EmptyResult />
      )}

      <NextPage
        pages={totalPages}
        currentPage={paginatedLinks?.page ?? 1}
        nextPage={nextPage}
      />
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
