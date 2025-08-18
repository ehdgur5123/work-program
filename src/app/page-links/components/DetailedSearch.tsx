"use client";
import { useEffect, useState } from "react";
import CategorySection from "@/app/page-links/components/CategorySection";
import useCategory from "@/app/page-links/hooks/useCategory";
import useIsMobile from "@/app/hooks/useIsMobile";

interface DetailedSearchProps {
  handleCategory: (category: {
    selectedLarge: string;
    selectedMedium: string;
    selectedSmall: string;
  }) => void;
  resetTrigger: boolean;
}

export default function DetailedSearch({
  handleCategory,
  resetTrigger,
}: DetailedSearchProps) {
  const [showDetailSearch, setShowDetailSearch] = useState(false);
  const isMobile = useIsMobile();
  const {
    isLoading,
    data,
    largeEntries,
    selectedLarge,
    setSelectedLarge,
    mediumEntries,
    selectedMedium,
    setSelectedMedium,
    smallEntries,
    selectedSmall,
    setSelectedSmall,
  } = useCategory();

  useEffect(() => {
    if (!isLoading && data) {
      handleCategory({ selectedLarge, selectedMedium, selectedSmall });
    }
  }, [selectedLarge, selectedMedium, selectedSmall, isLoading, data]);

  const resetCategory = () => {
    setSelectedLarge("");
    setSelectedMedium("");
    setSelectedSmall("");
  };

  useEffect(() => {
    resetCategory();
  }, [resetTrigger]);

  useEffect(() => {
    if (!isMobile) setShowDetailSearch(true);
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <button
          className="w-full border-2 p-2 flex items-center justify-center active:scale-90"
          onClick={() => setShowDetailSearch(!showDetailSearch)}
        >
          DETAIL SEARCH
        </button>
      ) : null}
      {showDetailSearch && data && (
        <div
          className={
            isMobile
              ? "fixed left-0 top-0 z-100 w-full bg-black border-2"
              : "border-2 rounded-2xl"
          }
        >
          {/* 대분류 - 항상 표시 */}
          <CategorySection
            label="대분류"
            categories={largeEntries}
            selected={selectedLarge}
            onSelect={(name) => {
              setSelectedLarge(name);
              setSelectedMedium("");
              setSelectedSmall("");
            }}
            style="border-b-2"
          />

          {/* 중분류 - 틀은 항상 표시, 내용은 조건부로 */}
          <CategorySection
            label="중분류"
            categories={mediumEntries}
            selected={selectedMedium}
            onSelect={(name) => {
              setSelectedMedium(name);
              setSelectedSmall("");
            }}
            style="border-b-2"
          />

          {/* 소분류 - 틀은 항상 표시, 내용은 조건부로 */}
          <CategorySection
            label="소분류"
            categories={smallEntries}
            selected={selectedSmall}
            onSelect={(name) => {
              setSelectedSmall(name);
            }}
          />
        </div>
      )}
    </>
  );
}
