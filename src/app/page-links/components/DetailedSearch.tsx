"use client";
import { useEffect, useState } from "react";
import { getToSummary } from "../controllers/axiosLink";
import CategorySection from "@/app/page-links/components/CategorySection";

interface DetailedSearchProps {
  handleCategory: (category: {
    large: string;
    medium: string;
    small: string;
  }) => void;
  resetTrigger: boolean;
  isMobile: boolean;
}

type CategoryTree = {
  [large: string]: {
    sum: number;
    medium: {
      [medium: string]: {
        sum: number;
        small: {
          [small: string]: {
            sum: number;
          };
        };
      };
    };
  };
};

export default function DetailedSearch({
  handleCategory,
  resetTrigger,
  isMobile,
}: DetailedSearchProps) {
  const [summary, setSummary] = useState<CategoryTree>();
  const [showDetailSearch, setShowDetailSearch] = useState(false);
  const [large, setLarge] = useState("");
  const [medium, setMedium] = useState("");
  const [small, setSmall] = useState("");
  useEffect(() => {
    handleCategory({ large, medium, small });
  }, [large, medium, small]);

  useEffect(() => {
    const fetchSummary = async () => {
      const data = await getToSummary();
      setSummary(data);
    };
    fetchSummary();
  }, []);

  useEffect(() => {
    setLarge("");
    setMedium("");
    setSmall("");
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
      {showDetailSearch && summary && (
        <div
          className={isMobile ? "fixed left-0 top-0 z-100 w-full bg-black" : ""}
        >
          {/* 대분류 - 항상 표시 */}
          <CategorySection
            label="대분류"
            categories={Object.entries(summary)}
            selected={large}
            onSelect={(name) => {
              setLarge(name);
              setMedium("");
              setSmall("");
            }}
          />

          {/* 중분류 - 틀은 항상 표시, 내용은 조건부로 */}
          <CategorySection
            label="중분류"
            categories={large ? Object.entries(summary[large].medium) : []}
            selected={medium}
            onSelect={(name) => {
              setMedium(name);
              setSmall("");
            }}
          />

          {/* 소분류 - 틀은 항상 표시, 내용은 조건부로 */}
          <CategorySection
            label="소분류"
            categories={
              large && medium
                ? Object.entries(summary[large].medium[medium].small)
                : []
            }
            selected={small}
            onSelect={(name) => {
              setSmall(name);
            }}
          />
        </div>
      )}
    </>
  );
}

// Object.entries()와 구조 분해
//  summary가 이런데이터라면,
//    const summary = {
//      "개발": { sum: 3 },
//      "디자인": { sum: 5 }
//    };
//  Object.entries(summary)는 이렇게 변환됩니다:
//    [
//      ["개발", { sum: 3 }],
//      ["디자인", { sum: 5 }]
//    ]
