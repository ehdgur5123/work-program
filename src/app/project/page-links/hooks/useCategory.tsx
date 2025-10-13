"use client";

import { useQuery } from "@tanstack/react-query";
import { getToCategory } from "@/app/project/page-links/controllers/axiosLink";
import { useState, useMemo } from "react";

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

export default function useCategory() {
  const { data, isLoading, isError } = useQuery<CategoryTree>({
    queryKey: ["categorys"],
    queryFn: getToCategory,
  });
  const [selectedLarge, setSelectedLarge] = useState<string>("");
  const [selectedMedium, setSelectedMedium] = useState<string>("");
  const [selectedSmall, setSelectedSmall] = useState<string>("");

  // 대분류 리스트
  const largeList = useMemo(() => {
    if (!data) return [];
    return Object.keys(data);
  }, [data]);

  // 대분류 엔트리
  const largeEntries = useMemo(() => {
    if (!data) return [];
    return Object.entries(data);
  }, [data]);

  // 중분류 리스트
  const mediumList = useMemo(() => {
    if (!data || !selectedLarge) return [];
    return Object.keys(data[selectedLarge]?.medium || {});
  }, [data, selectedLarge]);

  // 중분류 엔트리
  const mediumEntries = useMemo(() => {
    if (!data || !selectedLarge) return [];
    return Object.entries(data[selectedLarge]?.medium || {});
  }, [data, selectedLarge]);

  // 소분류 리스트
  const smallList = useMemo(() => {
    if (!data || !selectedLarge || !selectedMedium) return [];
    return Object.keys(
      data[selectedLarge]?.medium[selectedMedium]?.small || {}
    );
  }, [data, selectedLarge, selectedMedium]);

  // 소분류 엔트리
  const smallEntries = useMemo(() => {
    if (!data || !selectedLarge || !selectedMedium) return [];
    return Object.entries(
      data[selectedLarge]?.medium[selectedMedium]?.small || {}
    );
  }, [data, selectedLarge, selectedMedium]);

  return {
    isLoading,
    isError,
    data,
    largeEntries,
    largeList,
    selectedLarge,
    setSelectedLarge,
    mediumEntries,
    mediumList,
    selectedMedium,
    setSelectedMedium,
    smallEntries,
    smallList,
    selectedSmall,
    setSelectedSmall,
  };
}
