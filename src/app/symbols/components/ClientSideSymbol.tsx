"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useState } from "react";
import SymbolLists from "./SymbolLists";
import Search from "./Search";
import { SymbolItem } from "@/app/symbols/types";

interface ClientSideSymbolProps {
  initialSymbols: SymbolItem[];
}

export default function ClientSideSymbol({
  initialSymbols,
}: ClientSideSymbolProps) {
  const [symbols, setSymbols] = useState<SymbolItem[]>(initialSymbols);
  const [mode, setMode] = useState(true);

  useEffect(() => {
    setSymbols(initialSymbols);
  }, [initialSymbols]);

  const [hasSearch, setHasSearch] = useState(false);
  const [searchValue, setSearchValue] = useState<SymbolItem[]>([]);

  const handleSearch = (search: string) => {
    setHasSearch(true);
    const searchResult = symbols.filter((item) =>
      item.name.some((n) => n.includes(search))
    );
    if (Array.isArray(searchResult) && searchResult.length > 0) {
      setSearchValue(searchResult);
    } else {
      setSearchValue([]);
    }
    console.log(Boolean(searchValue));
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="flex flex-col w-180 justify-center gap-10">
          <div className="flex justify-between items-center">
            <Search handleSearch={handleSearch} />
            <div className="flex flex-row gap-2">
              <button
                className="text-sm p-1 border-1 cursor-pointer hover:text-blue-100 active:scale-90"
                onClick={() => {
                  setSymbols(initialSymbols);
                  setHasSearch(false);
                }}
              >
                전체보기
              </button>
              <button className="text-sm p-1 border-1 cursor-pointer hover:text-blue-100 active:scale-90">
                기호추가
              </button>
              <button
                className="text-sm p-1 border-1 cursor-pointer hover:text-blue-100 active:scale-90"
                onClick={() => setMode(!mode)}
              >
                {mode ? "태그모드" : "카피모드"}
              </button>
            </div>
          </div>
          <div>
            {hasSearch ? (
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
              <SymbolLists
                symbols={symbols}
                setSymbols={setSymbols}
                mode={mode}
              />
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden block">
        <div className="flex flex-col justify-center gap-3">
          <Search handleSearch={handleSearch} />
          <div className="flex flex-row gap-2 justify-end">
            <button
              className="w-8 h-8 p-1 flex items-center justify-center border border-gray-400 hover:text-blue-100 rounded-full"
              onClick={() => {
                setSymbols(initialSymbols);
                setHasSearch(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
              </svg>
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-gray-400 hover:text-blue-100 rounded-full">
              +
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center border border-gray-400 hover:text-blue-100 rounded-full"
              onClick={() => setMode(!mode)}
            >
              {mode ? "T" : "C"}
            </button>
          </div>

          <div>
            {hasSearch ? (
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
              <SymbolLists
                symbols={symbols}
                setSymbols={setSymbols}
                mode={mode}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
