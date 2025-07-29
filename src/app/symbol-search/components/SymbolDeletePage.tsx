"use client";
import { SymbolItem } from "@/app/symbol-search/types";
import { useEffect, useState } from "react";
import { LoadingSpinnerSmall } from "../../components/Loading";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { fetchDeleteSymbols } from "@/app/symbol-search/controllers/fetchSymbols";

interface SymbolDeletePageProps {
  selectedSymbols: SymbolItem[] | null;
  setSelectedSymbols: React.Dispatch<React.SetStateAction<SymbolItem[] | null>>;
  handleMessage: (text: string, color: string) => void;
  message: { text: string; color: string };
  handleDeletedSymbols: () => void;
  isMobile: boolean;
}
export default function SymbolDeletePage({
  selectedSymbols,
  setSelectedSymbols,
  handleMessage,
  message,
  handleDeletedSymbols,
  isMobile,
}: SymbolDeletePageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteIdList, setDeleteIdList] = useState<string[]>([]);

  const symbolsDeleteClick = async () => {
    setIsLoading(true);
    const ids = selectedSymbols?.map((symbol) => symbol._id) ?? [];
    setDeleteIdList(ids);
    try {
      await fetchDeleteSymbols(ids);
      handleMessage("삭제가 완료되었습니다.", "text-green-500");
      handleDeletedSymbols();
    } catch {
      handleMessage("삭제에 실패하였습니다.", "text-red-500");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(deleteIdList);
  }, [deleteIdList]);

  return (
    <div
      className={
        isMobile
          ? "fixed bottom-0 w-full bg-black max-h-1/2 overflow-auto"
          : "relative w-1/2"
      }
    >
      <div className="md:sticky md:top-50">
        <div
          className={`m-5 border-2 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center ${
            isMobile ? "max-h-[500px] min-h-[200px]" : "min-w-80 min-h-[450px]"
          }`}
        >
          {!selectedSymbols || selectedSymbols.length === 0 ? (
            <div className="text-center text-3xl p-3">
              삭제할 기호를 선택해 주세요.
            </div>
          ) : (
            <>
              <div
                className={`border-2 w-full rounded-2xl p-5 grid gap-5 overflow-y-auto ${
                  isMobile
                    ? "grid-cols-2 h-30"
                    : "min-h-[350px] max-h-[350px] grid-cols-3"
                }`}
              >
                {selectedSymbols.map((symbol) => (
                  <div
                    key={symbol._id}
                    className="relative border-2 rounded-2xl flex flex-col gap-2 p-2 items-center justify-center min-h-[100px] max-h-[100px] min-w-fit"
                  >
                    <button
                      className="absolute top-0 right-0 p-1 hover:text-gray-500 active:scale-75"
                      type="button"
                      onClick={() => {
                        setSelectedSymbols((prev) =>
                          (prev ?? []).filter((n) => n._id !== symbol._id)
                        );
                        handleMessage("", "text-black-500");
                      }}
                    >
                      <XCircleIcon className="size-7" />
                    </button>
                    <div className="text-2xl md:text-3xl">{symbol.symbol}</div>
                    <div className="text-[20px] md:text-2xl">{symbol.code}</div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="px-3 py-1 border-2 text-white rounded-sm text-sm md:text-2xl cursor-pointer hover:bg-gray-500 active:scale-90 w-full mt-2"
                onClick={symbolsDeleteClick}
              >
                확인
              </button>
            </>
          )}
          <div className={`text-center mt-3 h-5 ${message.color}`}>
            {isLoading ? <LoadingSpinnerSmall /> : message.text}
          </div>
        </div>
      </div>
    </div>
  );
}
