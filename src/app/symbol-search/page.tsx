"use client";
import { useEffect, useState } from "react";
import { fetchSymbols } from "./controllers/fetchSymbols";
import { SymbolItem, hambergerToggleListType } from "@/app/symbol-search/types";
import ScrollToTop from "@/app/symbols/components/ScrollToTop";
import { LoadingSpinner } from "./components/Loading";
import SymbolLists from "@/app/symbol-search/components/SymbolLists";
import SearchSymbol from "@/app/symbol-search/components/SearchSymbol";
import ResetSearch from "./components/ResetSearch";
import Hamberger from "./components/Hamberger";
import SymbolAddPage from "./components/SymbolAddPage";
import SymbolUpdatePage from "./components/SymbolUpdatePage";

export default function SymbolSearchPage() {
  const [axiosSymbols, setAxiosSymbols] = useState<SymbolItem[] | null>(null);
  const [copySymbols, setCopySymbols] = useState<SymbolItem[] | null>([]);
  const [searchSymbols, setSearchSymbols] = useState<SymbolItem[] | null>([]);
  const [newSymbol, setNewSymbol] = useState<SymbolItem | null>(null);
  const [hasSearch, setHasSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolItem | null>(null);
  const [hambergerToggleList, setHambergerToggleList] =
    useState<hambergerToggleListType>({
      symbolAddToggle: false,
      symbolUpdateToggle: false,
      symbolDeleteToggle: false,
    });

  const showToggleTrue =
    hambergerToggleList.symbolAddToggle ||
    hambergerToggleList.symbolUpdateToggle ||
    hambergerToggleList.symbolDeleteToggle;

  useEffect(() => {
    const getSymbol = async () => {
      try {
        const response = await fetchSymbols();
        setAxiosSymbols(response);
        setCopySymbols(response);
      } catch (err) {
        console.log("에러: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    getSymbol();
  }, []);

  // 1. 서버에서 받은 새 심볼 처리
  const handleNewSymbol = (newSymbolValue: SymbolItem) => {
    setNewSymbol(newSymbolValue); // 항상 설정
  };

  // 2. newSymbol이 바뀔 때 copySymbols, searchSymbols 동기화
  useEffect(() => {
    if (!newSymbol) return;

    // copySymbols 업데이트
    setCopySymbols((prev) => {
      if (!prev) return [newSymbol];

      const exists = prev.some((item) => item.symbol === newSymbol.symbol);
      if (exists) {
        // 기존 symbol이 있으면 ID만 교체 (또는 전체 교체)
        return prev.map((item) =>
          item.symbol === newSymbol.symbol ? newSymbol : item
        );
      } else {
        return [...prev, newSymbol];
      }
    });

    // searchSymbols 업데이트
    const matchesSearch =
      newSymbol.name.some((n) => n.includes(search)) ||
      newSymbol.code.includes(search) ||
      newSymbol.symbol.includes(search);

    if (matchesSearch) {
      setSearchSymbols((prev) => {
        if (!prev) return [newSymbol];

        const exists = prev.some((item) => item.symbol === newSymbol.symbol);
        if (exists) {
          return prev.map((item) =>
            item.symbol === newSymbol.symbol ? newSymbol : item
          );
        } else {
          return [...prev, newSymbol];
        }
      });
    }
  }, [newSymbol, search]);

  const handleSearch = (search: string) => {
    setHasSearch(true);
    setSearch(search);
    const searchResult = copySymbols?.filter(
      (symbol) =>
        symbol.name.some((n) => n.includes(search)) ||
        symbol.code.includes(search) ||
        symbol.symbol.includes(search)
    );
    if (Array.isArray(searchResult) && searchResult.length > 0) {
      setSearchSymbols(searchResult);
    } else {
      setSearchSymbols([]);
    }
  };

  const resetSearchClick = () => {
    setSearchSymbols([]);
    setHasSearch(false);
  };

  const handleSymbol = (symbol: SymbolItem) => {
    setSelectedSymbol(symbol);
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <h1 className="my-10 mx-auto text-7xl text-center">기호 검색</h1>
      <div
        className={`mx-auto max-w-7xl ${
          showToggleTrue ? "flex min-w-3xl" : ""
        }`}
      >
        <div
          className={`flex flex-col gap-2 p-5 min-h-[1000px] ${
            showToggleTrue ? "w-1/2" : "w-full"
          }`}
        >
          <div className="flex p-2 gap-2 items-center justify-end">
            <SearchSymbol handleSearch={handleSearch} />
            <ResetSearch handleSearch={resetSearchClick} />
          </div>
          <SymbolLists
            symbols={hasSearch ? searchSymbols : copySymbols}
            handleSymbol={handleSymbol}
            hambergerToggleList={hambergerToggleList}
          />
        </div>
        {hambergerToggleList.symbolAddToggle ? (
          <div className="relative w-1/2">
            <div className="sticky top-50">
              <SymbolAddPage
                handleNewSymbol={handleNewSymbol}
                copySymbols={copySymbols}
              />
            </div>
          </div>
        ) : null}
        {hambergerToggleList.symbolUpdateToggle ? (
          <div className="relative w-1/2">
            <div className="sticky top-50">
              <SymbolUpdatePage selectedSymbol={selectedSymbol} />
            </div>
          </div>
        ) : null}
      </div>
      <div className="h-20"></div>
      <Hamberger
        hambergerToggleList={hambergerToggleList}
        setHambergerToggleList={setHambergerToggleList}
      />
      <ScrollToTop />
    </>
  );
}
