"use client";
import { useEffect, useState } from "react";
import { fetchSymbols } from "@/app/symbol-search/controllers/fetchSymbols";
import { SymbolItem, hambergerToggleListType } from "@/app/symbol-search/types";
import ScrollToTop from "@/app/components/ScrollToTop";
import { LoadingSpinner } from "@/app/components/Loading";
import SymbolLists from "@/app/symbol-search/components/SymbolLists";
import SearchSymbol from "@/app/symbol-search/components/SearchSymbol";
import ResetSearch from "@/app/symbol-search/components/ResetSearch";
import Hamberger from "@/app/symbol-search/components/Hamberger";
import SymbolAddPage from "@/app/symbol-search/components/SymbolAddPage";
import SymbolUpdatePage from "@/app/symbol-search/components/SymbolUpdatePage";
import SymbolDeletePage from "@/app/symbol-search/components/SymbolDeletePage";
import EmptyResult from "@/app/components/EmptyResult";
import useIsMobile from "@/app/hooks/useIsMobile";

export default function ClientPage() {
  const isMobile = useIsMobile();
  const [axiosSymbols, setAxiosSymbols] = useState<SymbolItem[] | null>(null);
  const [copySymbols, setCopySymbols] = useState<SymbolItem[] | null>([]);
  const [searchSymbols, setSearchSymbols] = useState<SymbolItem[] | null>([]);
  const [newSymbol, setNewSymbol] = useState<SymbolItem | null>(null);
  const [hasSearch, setHasSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolItem | null>(null);
  const [selectedSymbols, setSelectedSymbols] = useState<SymbolItem[] | null>(
    []
  );
  const [message, setMessage] = useState({ text: "", color: "text-black" });
  const [isSearchValue, setIsSearchValue] = useState(false);
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
        console.log(axiosSymbols);
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

  useEffect(() => {
    handleMessage("", "text-black-500");
    setSelectedSymbol(null);
    setSelectedSymbols([]);
  }, [hambergerToggleList]);

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
      setIsSearchValue(false);
    } else {
      setSearchSymbols([]);
      setIsSearchValue(true);
    }
  };

  const resetSearchClick = () => {
    setSearchSymbols([]);
    setHasSearch(false);
    setIsSearchValue(false);
  };

  const handleSymbol = (symbol: SymbolItem) => {
    if (hambergerToggleList.symbolUpdateToggle) {
      setSelectedSymbol(symbol);
    }

    if (hambergerToggleList.symbolDeleteToggle) {
      setSelectedSymbols((prev) => {
        const exists = prev?.some((n) => n._id === symbol._id);
        if (exists) {
          handleMessage("이미 선택된 기호입니다.", "text-red-500");
          return prev;
        }
        handleMessage("", "text-black-500");
        return prev ? [...prev, symbol] : [symbol];
      });
    }
  };

  const handleModifiedSymbol = (modifiedSymbol: SymbolItem) => {
    if (!modifiedSymbol._id) return;

    const updateArray = (symbols: SymbolItem[] | null) =>
      symbols
        ? symbols.map((item) =>
            item._id === modifiedSymbol._id ? modifiedSymbol : item
          )
        : null;
    setSelectedSymbol(modifiedSymbol);
    setCopySymbols((prev) => updateArray(prev));
    setSearchSymbols((prev) => updateArray(prev));
  };

  const handleDeletedSymbols = () => {
    if (!selectedSymbols || !copySymbols) return;

    const selectedIds = selectedSymbols.map((symbol) => symbol._id);

    const filterSymbols = (symbols: SymbolItem[] | null) =>
      symbols
        ? symbols.filter((symbol) => !selectedIds.includes(symbol._id))
        : null;

    setCopySymbols((prev) => filterSymbols(prev));
    setSearchSymbols((prev) => filterSymbols(prev));
    setSelectedSymbols([]);
  };

  const handleMessage = (text: string, color: string) => {
    setMessage({ text: text, color: color });
  };

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <h1 className="my-10 mx-auto md:text-7xl text-5xl text-center">
        기호 검색
      </h1>
      <div
        className={`mx-auto max-w-7xl ${
          showToggleTrue ? "md:flex md:min-w-3xl" : ""
        }`}
      >
        <div
          className={`flex flex-col gap-2 p-5 min-h-[1000px] max-w-4xl mx-auto ${
            showToggleTrue ? "md:w-1/2 w-full" : "w-full"
          }`}
        >
          <div className="flex p-2 gap-2 items-center justify-end">
            <SearchSymbol handleSearch={handleSearch} />
            <ResetSearch handleSearch={resetSearchClick} />
          </div>
          {isSearchValue ? (
            <EmptyResult />
          ) : (
            <SymbolLists
              symbols={hasSearch ? searchSymbols : copySymbols}
              handleSymbol={handleSymbol}
              hambergerToggleList={hambergerToggleList}
            />
          )}
        </div>
        {hambergerToggleList.symbolAddToggle ? (
          <SymbolAddPage
            handleNewSymbol={handleNewSymbol}
            copySymbols={copySymbols}
            handleMessage={handleMessage}
            message={message}
            isMobile={isMobile}
          />
        ) : null}
        {hambergerToggleList.symbolUpdateToggle ? (
          <SymbolUpdatePage
            selectedSymbol={selectedSymbol}
            handleMessage={handleMessage}
            message={message}
            handleModifiedSymbol={handleModifiedSymbol}
            isMobile={isMobile}
          />
        ) : null}
        {hambergerToggleList.symbolDeleteToggle ? (
          <SymbolDeletePage
            selectedSymbols={selectedSymbols}
            setSelectedSymbols={setSelectedSymbols}
            handleMessage={handleMessage}
            message={message}
            handleDeletedSymbols={handleDeletedSymbols}
            isMobile={isMobile}
          />
        ) : null}
      </div>
      <div className={showToggleTrue && isMobile ? "h-[500px]" : "h-20"}></div>
      <Hamberger
        hambergerToggleList={hambergerToggleList}
        setHambergerToggleList={setHambergerToggleList}
        isMobile={isMobile}
      />
      <ScrollToTop />
    </>
  );
}
