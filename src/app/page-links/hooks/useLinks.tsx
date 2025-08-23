"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { getToLink } from "@/app/page-links/controllers/axiosLink";
import { PaginatedLinkResponse, CategoryProps } from "@/app/page-links/types";

const initialCategory = {
  selectedLarge: "",
  selectedMedium: "",
  selectedSmall: "",
};

export default function useLinks() {
  const [searchValue, setSearchValue] = useState("");
  const [pageState, setPageState] = useState(1);
  const [category, setCategory] = useState<CategoryProps>(initialCategory);

  const {
    data: paginatedLinks,
    isLoading,
    isError,
  } = useQuery<PaginatedLinkResponse>({
    queryKey: ["links", pageState, searchValue, JSON.stringify(category)],
    queryFn: () => {
      const {
        selectedLarge: large,
        selectedMedium: medium,
        selectedSmall: small,
      } = category;
      return getToLink(pageState, searchValue, large, medium, small);
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });

  const resetFilters = () => {
    setCategory(initialCategory);
    setPageState(1);
    setSearchValue("");
  };

  return {
    searchValue,
    setSearchValue,
    pageState,
    setPageState,
    category,
    setCategory,
    paginatedLinks,
    isLoading,
    isError,
    resetFilters,
  };
}
