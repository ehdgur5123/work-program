"use client";
import { useEffect, useState } from "react";
import { fetchSymbols } from "./controllers/fetchSymbols";
import { SymbolItem, hambergerToggleListType } from "@/app/symbol-search/types";
import ScrollToTop from "@/app/symbols/components/ScrollToTop";
import LoadingSpinner from "./components/Loading";
import SymbolLists from "@/app/symbol-search/components/SymbolLists";
import SearchSymbol from "@/app/symbol-search/components/SearchSymbol";
import ResetSearch from "./components/ResetSearch";
import Hamberger from "./components/Hamberger";
import SymbolAddPage from "./components/SymbolAddPage";

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

  useEffect(() => {
    if (copySymbols && newSymbol) {
      setCopySymbols((prev) => (prev ? [...prev, newSymbol] : [newSymbol]));
    }
    if (
      newSymbol?.name.some((n) => n.includes(search)) ||
      newSymbol?.code.includes(search) ||
      newSymbol?.symbol.includes(search)
    ) {
      setSearchSymbols((prev) => (prev ? [...prev, newSymbol] : [newSymbol]));
    }
  }, [newSymbol]);

  const handleNewSymbol = (newSymbol: SymbolItem) => {
    setNewSymbol(newSymbol);
  };

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
      <div className="flex flex-col gap-2 mx-auto max-w-4xl p-5">
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
      <div className="h-20"></div>
      <Hamberger
        hambergerToggleList={hambergerToggleList}
        setHambergerToggleList={setHambergerToggleList}
      />
      <ScrollToTop />
    </>
  );
}
