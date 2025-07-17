"use client";

import { SymbolItem } from "@/app/symbol-search/types";
import { useEffect, useState } from "react";
import InputData from "./InputData";
import {
  PlusCircleIcon,
  XMarkIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
// import { 심볼수정패치 } from "@/app/symbol-search/controllers/fetchSymbols";

interface SymbolUpdatePageProps {
  selectedSymbol: SymbolItem | null;
}

export default function SymbolUpdatePage({
  selectedSymbol,
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

  useEffect(() => {
    setSymbolToModify(symbolInitialValue);
  }, [selectedSymbol]);

  useEffect(() => {
    console.log(symbolToModify);
  }, [symbolToModify]);

  const symbolSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const addNameClick = () => {
    if (symbolToModify.name?.some((n) => n === addName)) {
      alert("이미 있는 기호입니다.");
      return;
    }
    setSymbolToModify((prev) => ({
      ...prev,
      name: [...(prev.name || []), addName],
    }));
    setAddName("");
  };

  const deleteNameClick = (item: string) => {
    setSymbolToModify((prev) => ({
      ...prev,
      name: prev.name?.filter((n) => n !== item) || [],
    }));
  };

  return (
    <div className="m-5 border-2 rounded-xl shadow-sm p-4 min-h-[450px] flex flex-col items-center justify-center">
      {!selectedSymbol ? (
        <div className="text-center text-3xl p-3">
          수정할 기호를 클릭해주세요.
        </div>
      ) : (
        <form
          onSubmit={symbolSubmit}
          className="text-center p-4 border-2 rounded-2xl max-w-full"
        >
          <div className="flex gap-5">
            <div className="flex items-center justify-center border-2 w-30 min-w-30 h-30 min-h-30 rounded-2xl">
              <div className="text-4xl">{symbolToModify.symbol}</div>
            </div>
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
          </div>
          <div className="flex flex-col items-start text-lg">
            <div className="border-2 mt-3 flex flex-wrap items-center justify-between w-full p-2">
              <label
                className="font-semibold text-white text-lg p-1"
                htmlFor="name"
              >
                Tag Name
              </label>
              <div className="flex gap-2 items-center justify-center">
                <input
                  id="name"
                  className="bg-white min-w-[100px] max-w-[200px] text-black p-1"
                  value={addName}
                  onChange={(e) => setAddName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
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

            <div className="flex flex-wrap gap-4 p-3 border-2 w-full min-h-40 overflow-auto items-start">
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
              className="px-3 py-1 border-2 text-white rounded-sm text-2xl cursor-pointer hover:bg-gray-500 active:scale-90 w-full mt-2"
            >
              확인
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
