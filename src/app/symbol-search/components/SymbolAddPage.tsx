"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { fetchAddSymbol } from "@/app/symbol-search/controllers/fetchSymbols";
import { useEffect, useState } from "react";
import InputData from "./InputData";
import { SymbolItem } from "@/app/symbol-search/types";
import { LoadingSpinnerSmall } from "@/app/symbol-search/components/Loading";

interface SymbolAddPageProps {
  handleNewSymbol: (newSymbol: SymbolItem) => void;
  copySymbols: SymbolItem[] | null;
  handleMessage: (text: string, color: string) => void;
  message: { text: string; color: string };
  isMobile: boolean;
}

export default function SymbolAddPage({
  handleNewSymbol,
  copySymbols,
  handleMessage,
  message,
  isMobile,
}: SymbolAddPageProps) {
  const nameInitialValue = ["", "", "", "", ""];
  const symbolInitialValue = {
    _id: "",
    symbol: "",
    unicode: "",
    html: "",
    name: nameInitialValue,
    code: "",
  };

  const [newSymbol, setNewSymbol] = useState<SymbolItem>(symbolInitialValue);
  const [nameList, setNameList] = useState(nameInitialValue);

  const [isLoading, setIsLoading] = useState(false);
  const nameListChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedList = [...nameList];
    updatedList[index] = e.target.value;
    setNameList(updatedList);
  };

  const validateSymbolData = (newSymbol: SymbolItem) => {
    if (newSymbol.symbol.trim().length === 0) {
      handleMessage("기호를 입력해주세요", "text-red-500");
      return false;
    } else if (newSymbol.symbol.trim().length >= 2) {
      handleMessage("기호는 1글자만 입력해야 합니다.", "text-red-500");
      return false;
    } else if (
      copySymbols?.some(
        (item) => item.symbol.trim() === newSymbol.symbol.trim()
      )
    ) {
      handleMessage("이미 존재하는 기호입니다.", "text-red-500");
      return false;
    }

    return true;
  };
  const symbolSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateSymbolData(newSymbol)) return;

    const cleanOrNone = (value: string) =>
      value.trim().length === 0 ? "None" : value.trim();

    const unicode = cleanOrNone(newSymbol.unicode);
    const html = cleanOrNone(newSymbol.html);
    const code = cleanOrNone(newSymbol.code);
    const name = newSymbol.name.filter((n) => n.trim().length !== 0);

    const updatedSymbol: SymbolItem = {
      ...newSymbol,
      _id: crypto.randomUUID(),
      unicode,
      html,
      code,
      name,
    };

    setIsLoading(true);
    try {
      setNewSymbol(updatedSymbol);
      handleNewSymbol(updatedSymbol);
      const { _id, ...symbolWithoutId } = updatedSymbol;
      console.log(_id);
      const response = await fetchAddSymbol(symbolWithoutId);
      if (response !== null && response !== "EXISTS") {
        handleNewSymbol({ ...updatedSymbol, _id: response._id });
      }

      handleMessage("추가가 완료되었습니다.", "text-green-500");
    } catch {
      handleMessage("전송에 실패하였습니다.", "text-red-500");
    } finally {
      setNewSymbol({ ...symbolInitialValue, name: nameList });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setNewSymbol({ ...newSymbol, name: nameList });
  }, [nameList]);

  return (
    <div
      className={
        isMobile
          ? "fixed bottom-0 w-full bg-black max-h-1/2 overflow-auto"
          : "relative w-1/2"
      }
    >
      <div className="md:sticky md:top-50">
        <div className="flex flex-col border-2 rounded-xl shadow-sm p-4 m-5">
          {isMobile ? null : (
            <div className="flex items-center justify-end">
              <button
                onClick={() => {
                  setNewSymbol(symbolInitialValue);
                  setNameList(nameInitialValue);

                  handleMessage("", "text-black-500");
                }}
                className="cursor-pointer hover:text-gray-500 rounded-full text-3xl active:scale-80"
              >
                <ArrowPathIcon className="size-6 mb-3" />
              </button>
            </div>
          )}
          <form onSubmit={symbolSubmit}>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col justify-between md:gap-4 gap-2">
                <InputData
                  label="기호"
                  id="symbol"
                  placeholder="기호(필수)"
                  value={newSymbol.symbol}
                  handleChange={(e) => {
                    setNewSymbol({ ...newSymbol, symbol: e.target.value });
                  }}
                />
                {isMobile ? null : (
                  <InputData
                    label="유니코드"
                    id="unicode"
                    placeholder="유니코드"
                    value={newSymbol.unicode}
                    handleChange={(e) => {
                      setNewSymbol({ ...newSymbol, unicode: e.target.value });
                    }}
                  />
                )}
                {isMobile ? null : (
                  <InputData
                    label="html"
                    id="html"
                    placeholder="html"
                    value={newSymbol.html}
                    handleChange={(e) => {
                      setNewSymbol({ ...newSymbol, html: e.target.value });
                    }}
                  />
                )}
                {isMobile ? null : (
                  <InputData
                    label="Alt Code"
                    id="altCode"
                    placeholder="Alt Code"
                    value={newSymbol.code}
                    handleChange={(e) => {
                      setNewSymbol({ ...newSymbol, code: e.target.value });
                    }}
                  />
                )}
              </div>
            </div>
            {/* 태그 영역 */}
            <label
              htmlFor="add_tag_0"
              className="text-sm md:text-lg font-semibold text-white flex items-center justify-start my-2"
            >
              태그
            </label>
            <div className="flex flex-row gap-2">
              {nameList.map((item, index) => (
                <input
                  key={index}
                  id={`add_tag_${index}`}
                  value={item}
                  onChange={(e) => nameListChange(e, index)}
                  className=" text-white border-2 px-2 py-1 rounded-sm mb-1 w-full h-9"
                />
              ))}
            </div>

            <button
              type="submit"
              className="px-3 py-1 border-2 text-white rounded-sm text-sm md:text-2xl cursor-pointer hover:bg-gray-500 active:scale-90 w-full mt-2 "
              disabled={isLoading ? true : false}
            >
              확인
            </button>
          </form>
          <div className={`text-center mt-3 h-5 ${message.color}`}>
            {isLoading ? <LoadingSpinnerSmall /> : message.text}
          </div>
        </div>
      </div>
    </div>
  );
}
