"use client";

import { useEffect, useMemo, useState } from "react";
import { SymbolItemType } from "@/app/project/symbols/types";

export type UseSearchOptions = {
  mode?: "realtime" | "submit"; // realtime: 입력할때마다 필터, submit: 버튼 누를때만 필터
  debounceMs?: number;
};

export default function useSearch(
  data: SymbolItemType[] = [],
  options: UseSearchOptions = {}
) {
  const { mode = "realtime", debounceMs = 200 } = options;

  const [searchValue, setSearchValue] = useState("");
  const [debounced, setDebounced] = useState(searchValue);
  const [submittedValue, setSubmittedValue] = useState<string | null>(null);

  // 디바운스 (realtime 모드에서 사용)
  useEffect(() => {
    if (mode !== "realtime") return;
    const t = setTimeout(() => setDebounced(searchValue), debounceMs);
    return () => clearTimeout(t);
  }, [searchValue, debounceMs, mode]);

  // submit 모드일 때는 제출된 값으로 필터링
  const activeQuery = mode === "realtime" ? debounced : submittedValue ?? "";

  const filteredData = useMemo(() => {
    const q = (activeQuery || "").trim().toLowerCase();
    if (!q) return data;

    return data.filter((item) => {
      const symbolMatch = item.symbol?.toLowerCase().includes(q);
      const codeMatch = item.code?.toLowerCase().includes(q);
      const nameMatch =
        Array.isArray(item.name) &&
        item.name.some((n) => n.toLowerCase().includes(q));
      const unicodeMatch = item.unicode?.toLowerCase().includes(q);
      const htmlMatch = item.html?.toLowerCase().includes(q);

      return Boolean(
        symbolMatch || codeMatch || nameMatch || unicodeMatch || htmlMatch
      );
    });
  }, [data, activeQuery]);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (mode === "submit") {
      if (!searchValue.trim()) {
        alert("검색어를 입력하세요.");
        return;
      }
      setSubmittedValue(searchValue.trim());
    }
  };

  const clear = () => {
    setSearchValue("");
    setSubmittedValue(null);
    setDebounced("");
  };

  return {
    searchValue,
    setSearchValue,
    handleSubmit,
    clear,
    filteredData,
    mode,
  };
}
