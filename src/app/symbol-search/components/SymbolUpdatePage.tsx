"use client";

import { SymbolItem } from "@/app/symbol-search/types";
import { useEffect, useState } from "react";
import InputData from "./InputData";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { fetchUpdateSymbol } from "@/app/symbol-search/controllers/fetchSymbols";
import { LoadingSpinnerSmall } from "./Loading";
import isEqual from "lodash.isequal";
import { omit } from "lodash";

interface SymbolUpdatePageProps {
  selectedSymbol: SymbolItem | null;
  handleMessage: (text: string, color: string) => void;
  message: { text: string; color: string };
  handleModifiedSymbol: (symbolToModify: SymbolItem) => void;
  isMobile: boolean;
}

export default function SymbolUpdatePage({
  selectedSymbol,
  handleMessage,
  message,
  handleModifiedSymbol,
  isMobile,
}: SymbolUpdatePageProps) {
  const symbolInitialValue = {
    _id: selectedSymbol?._id,
    symbol: selectedSymbol?.symbol,
    unicode: selectedSymbol?.unicode,
    html: selectedSymbol?.html,
    name: selectedSymbol?.name,
    code: selectedSymbol?.code,
  };

  const [symbolToModify, setSymbolToModify] = useState(symbolInitialValue);
  const [addName, setAddName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSymbolToModify(symbolInitialValue);
    handleMessage("", "text-black-500");
  }, [selectedSymbol]);

  const normalizeSymbolData = (symbol: SymbolItem): SymbolItem => {
    return {
      ...symbol,
      unicode: symbol.unicode?.trim() || "None",
      html: symbol.html?.trim() || "None",
      code: symbol.code?.trim() || "None",
    };
  };

  const updateSymbolSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!selectedSymbol?._id) return;

    const normalized = normalizeSymbolData(symbolToModify as SymbolItem);
    const normalizedSelected = normalizeSymbolData(selectedSymbol);

    if (isEqual(omit(normalized, "__v"), omit(normalizedSelected, "__v"))) {
      handleMessage("변경사항이 없습니다.", "text-yellow-500");
      return;
    }

    setIsLoading(true);

    try {
      handleModifiedSymbol(normalized);
      const response = await fetchUpdateSymbol(selectedSymbol._id, normalized);
      if (response) setSymbolToModify(response);
      handleMessage("변경이 완료되었습니다.", "text-green-500");
    } catch {
      handleMessage("전송에 실패하였습니다.", "text-red-500");
    } finally {
      setIsLoading(false);
    }
  };

  const addNameClick = () => {
    if (addName.trim().length === 0) {
      handleMessage("이름을 입력해주세요", "text-red-500");
      return;
    }
    if (symbolToModify.name?.some((n) => n === addName)) {
      handleMessage("이미 있는 이름입니다.", "text-red-500");
      return;
    }
    setSymbolToModify((prev) => ({
      ...prev,
      name: [...(prev.name || []), addName],
    }));
    handleMessage("확인을 눌러주세요", "text-yellow-500");
    setAddName("");
  };

  const deleteNameClick = (item: string) => {
    setSymbolToModify((prev) => ({
      ...prev,
      name: prev.name?.filter((n) => n !== item) || [],
    }));
    handleMessage("확인을 눌러주세요", "text-yellow-500");
  };

  const SymbolViewDesign = (
    <div className="flex items-center justify-center border-2 md:w-30  md:h-30 h-12 w-12 rounded-full md:rounded-2xl">
      <div className="text-2xl md:text-4xl">{symbolToModify.symbol}</div>
    </div>
  );

  return (
    <div
      className={
        isMobile
          ? "fixed bottom-0 w-full bg-black max-h-1/2 overflow-auto"
          : "relative w-1/2"
      }
    >
      <div className="md:sticky md:top-50">
        <div className="m-5 border-2 rounded-xl shadow-sm md:p-4 md:min-h-[450px] flex flex-col items-center justify-center">
          {!selectedSymbol ? (
            <div className="text-center text-2xl md:text-3xl p-3">
              수정할 기호를 클릭해주세요.
            </div>
          ) : (
            <form
              onSubmit={updateSymbolSubmit}
              className="text-center p-2 md:p-4 md:border-2 rounded-2xl w-full"
            >
              <div className="flex gap-5">
                {isMobile ? null : SymbolViewDesign}
                {isMobile ? null : (
                  <div className="flex flex-col gap-2 justify-center">
                    <InputData
                      label="유니코드"
                      id="unicode"
                      placeholder=""
                      value={symbolToModify.unicode || ""}
                      handleChange={(e) =>
                        setSymbolToModify({
                          ...symbolToModify,
                          unicode: e.target.value,
                        })
                      }
                    />
                    <InputData
                      label="html"
                      id="html"
                      placeholder=""
                      value={symbolToModify.html || ""}
                      handleChange={(e) =>
                        setSymbolToModify({
                          ...symbolToModify,
                          html: e.target.value,
                        })
                      }
                    />
                    <InputData
                      label="Alt Code"
                      id="code"
                      placeholder=""
                      value={symbolToModify.code || ""}
                      handleChange={(e) =>
                        setSymbolToModify({
                          ...symbolToModify,
                          code: e.target.value,
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start md:text-lg">
                <div className="md:border-2 mt-3 flex flex-wrap items-center justify-between w-full p-2">
                  {isMobile ? null : (
                    <label
                      className="font-semibold text-white text-lg p-1"
                      htmlFor="name"
                    >
                      Tag Name
                    </label>
                  )}
                  <div className="flex gap-2 items-center justify-center">
                    {isMobile ? SymbolViewDesign : null}
                    <input
                      id="name"
                      className="bg-white md:min-w-[100px] max-w-[200px] w-full text-black p-1"
                      value={addName}
                      onChange={(e) => setAddName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addNameClick();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="p-1 border-2 whitespace-nowrap rounded-sm  cursor-pointer hover:bg-gray-500 active:scale-90"
                      onClick={addNameClick}
                    >
                      추가
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap md:gap-4 gap-2 p-3 border-2 w-full h-20 overflow-auto items-start">
                  {symbolToModify.name && symbolToModify.name.length > 0 ? (
                    symbolToModify.name.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 border-2 p-2 rounded-2xl"
                      >
                        {item}
                        <button
                          type="button"
                          className="cursor-pointer hover:text-gray-500 active:scale-70"
                          onClick={() => deleteNameClick(item)}
                        >
                          <XMarkIcon className="size-6" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-2">등록된 태그가 없습니다.</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-3 py-1 border-2 text-white rounded-sm text-sm md:text-2xl cursor-pointer hover:bg-gray-500 active:scale-90 w-full mt-2"
                >
                  확인
                </button>
              </div>
            </form>
          )}
          <div className={`text-center mt-3 h-5 ${message.color}`}>
            {isLoading ? <LoadingSpinnerSmall /> : message.text}
          </div>
        </div>
      </div>
    </div>
  );
}
