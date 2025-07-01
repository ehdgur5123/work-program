"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import SymbolLists from "./SymbolLists";
import Search from "./Search";
import { SymbolItem } from "@/app/symbols/types";
import SymbolHandleButton from "./Button/SymbolHandleButton";
import { TableCellsIcon } from "@heroicons/react/24/solid";
import SymbolAdd from "./SymbolAdd";

interface ClientSideSymbolProps {
  initialSymbols: SymbolItem[];
}

export default function ClientSideSymbol({
  initialSymbols,
}: ClientSideSymbolProps) {
  const [symbols, setSymbols] = useState<SymbolItem[]>(initialSymbols);
  const [mode, setMode] = useState(true);
  const [hasSymbolAdd, setHasSymbolAdd] = useState(false);
  const [hasSearch, setHasSearch] = useState(false);
  const [searchValue, setSearchValue] = useState<SymbolItem[]>([]);
  useEffect(() => {
    setSymbols(initialSymbols);
  }, [initialSymbols]);

  // 검색기능 핸들링
  const handleSearch = (search: string) => {
    setHasSearch(true);
    const searchResult = symbols.filter(
      (item) =>
        item.name.some((n) => n.includes(search)) ||
        item.code.includes(search) ||
        item.symbol.includes(search)
    );
    if (Array.isArray(searchResult) && searchResult.length > 0) {
      setSearchValue(searchResult);
    } else {
      setSearchValue([]);
    }
    console.log(Boolean(searchValue));
  };

  // 기호추가 핸들링
  const handleSymbolAdd = () => {
    setHasSymbolAdd(!hasSymbolAdd);
  };

  const handleNewSymbolChange = (newSymbol: SymbolItem) => {
    setSymbols((prev) => [...prev, newSymbol]);
  };

  return (
    <>
      <div className="flex flex-col w-100 justify-center gap-3 p-2 md:w-180">
        <div className="hidden md:block">
          <div className="flex justify-between items-center">
            <Search handleSearch={handleSearch} />
            <div className="flex flex-row gap-2">
              <SymbolHandleButton
                handleClick={() => {
                  setSymbols(symbols);
                  setHasSearch(false);
                  setHasSymbolAdd(false);
                }}
              >
                전체보기
              </SymbolHandleButton>

              <SymbolHandleButton handleClick={handleSymbolAdd}>
                기호추가
              </SymbolHandleButton>

              <SymbolHandleButton
                handleClick={() => {
                  setMode(!mode);
                  setHasSymbolAdd(false);
                }}
              >
                {mode ? "태그모드" : "카피모드"}
              </SymbolHandleButton>
            </div>
          </div>
        </div>
        <div className="md:hidden block">
          <Search handleSearch={handleSearch} />
          <div className="flex flex-row gap-2 justify-end">
            <SymbolHandleButton
              handleClick={() => {
                setSymbols(symbols);
                setHasSearch(false);
                setHasSymbolAdd(false);
              }}
              mobile={true}
              title="전체보기"
            >
              <TableCellsIcon className="size-5" />
            </SymbolHandleButton>
            <SymbolHandleButton
              handleClick={handleSymbolAdd}
              mobile={true}
              title="기호추가"
            >
              +
            </SymbolHandleButton>
            <SymbolHandleButton
              handleClick={() => {
                setMode(!mode);
                setHasSymbolAdd(false);
              }}
              mobile={true}
              title="모드변경"
            >
              {mode ? "T" : "C"}
            </SymbolHandleButton>
          </div>
        </div>
        {hasSymbolAdd ? (
          <div className="flex justify-center">
            <SymbolAdd onNewSymbolChange={handleNewSymbolChange} />
          </div>
        ) : hasSearch ? (
          Array.isArray(searchValue) && searchValue.length > 0 ? (
            <SymbolLists
              symbols={searchValue}
              setSymbols={setSearchValue}
              mode={mode}
            />
          ) : (
            <div className="flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/7568b83c-65f6-4a6b-bd4a-1bdbc2b65276/lgWezNYmwt.lottie"
                loop
                autoplay
                style={{ width: 600, height: 400 }}
              />
            </div>
          )
        ) : (
          <SymbolLists symbols={symbols} setSymbols={setSymbols} mode={mode} />
        )}
      </div>
    </>
  );
}
