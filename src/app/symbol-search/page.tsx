"use client";
import { useEffect, useState } from "react";
import { fetchSymbols } from "./controllers/fetchSymbols";
import { SymbolItem } from "@/app/symbol-search/types";
import ScrollToTop from "@/app/symbols/components/ScrollToTop";
import LoadingSpinner from "./loading";
import SymbolLists from "@/app/symbol-search/components/SymbolLists";
import SearchSymbol from "@/app/symbol-search/components/SearchSymbol";
import ResetSearch from "./components/ResetSearch";
import Hamberger from "./components/Hamberger";

export default function SymbolSearchPage() {
  const [axiosSymbols, setAxiosSymbols] = useState<SymbolItem[] | null>([]);
  const [copySymbols, setCopySymbols] = useState<SymbolItem[] | null>([]);
  const [searchSymbols, setSearchSymbols] = useState<SymbolItem[] | null>([]);
  const [newSymbol, setNewSymbol] = useState<SymbolItem | null>(null);
  const [hasSearch, setHasSearch] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getSymbol = async () => {
      try {
        const response = await fetchSymbols();
        setAxiosSymbols(response);
        setCopySymbols(response);
      } catch (err) {
        console.log("에러: ", err);
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

  if (!axiosSymbols) return <LoadingSpinner />;
  return (
    <>
      <h1 className="mt-20 h-20 text-7xl text-center mb-10">기호 검색</h1>
      <div className="flex gap-2">
        <div className="md:w-[800px] md:mx-auto  mx-3 sm:w-[400px] sm:mx-auto md:min-h-[1500px] sm:min-h-[1500px]">
          <div className="flex p-2 gap-2 items-center justify-end">
            <SearchSymbol handleSearch={handleSearch} />
            <ResetSearch handleSearch={resetSearchClick} />
          </div>
          <SymbolLists symbols={hasSearch ? searchSymbols : copySymbols} />
        </div>
        <Hamberger
          handleNewSymbol={handleNewSymbol}
          copySymbols={copySymbols}
        />
      </div>
      <div className="h-20"></div>

      <ScrollToTop />
    </>
  );
}
