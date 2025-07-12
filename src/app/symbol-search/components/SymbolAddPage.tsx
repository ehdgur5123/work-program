"use client";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { fetchAddSymbol } from "@/app/symbol-search/controllers/fetchSymbols";
import { useEffect, useState } from "react";
import { SymbolItem } from "@/app/symbol-search/types";
import InputData from "./InputData";

export default function SymbolAddPage() {
  const symbolInitialValue = {
    _id: "",
    symbol: "",
    unicode: "",
    html: "",
    name: [],
    code: "",
  };
  const [newSymbol, setNewSymbol] = useState<SymbolItem>(symbolInitialValue);
  const [nameList, setNameList] = useState(["", "", "", "", ""]);

  const nameListChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedList = [...nameList];
    updatedList[index] = e.target.value;
    setNameList(updatedList);
  };
  const symbolSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // await fetchAddSymbol(newSymbol);
  };

  useEffect(() => {
    console.log(newSymbol);
  }, [newSymbol]);

  useEffect(() => {
    setNewSymbol({ ...newSymbol, name: nameList });
  }, [nameList]);

  return (
    <div className="w-[700px] bg-amber-300">
      <form
        className="flex flex-col border border-gray-300 rounded-xl shadow-sm p-4 max-w-150"
        onSubmit={symbolSubmit}
      >
        {/* 삭제 버튼 */}
        <div className="flex items-center justify-end">
          <button
            onClick={() =>
              setNewSymbol({ ...symbolInitialValue, name: nameList })
            }
            className="cursor-pointer hover:text-gray-500 rounded-full text-3xl active:scale-80"
          >
            <ArrowPathIcon className="size-6 mb-3" />
          </button>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col justify-between gap-2">
            {/* 기호 */}
            <InputData
              label="기호"
              id="symbol"
              placeholder="기호(필수)"
              value={newSymbol.symbol}
              handleChange={(e) => {
                setNewSymbol({ ...newSymbol, symbol: e.target.value });
              }}
            />
            <InputData
              label="유니코드"
              id="unicode"
              placeholder="유니코드"
              value={newSymbol.unicode}
              handleChange={(e) => {
                setNewSymbol({ ...newSymbol, unicode: e.target.value });
              }}
            />
            <InputData
              label="html"
              id="html"
              placeholder="html"
              value={newSymbol.html}
              handleChange={(e) => {
                setNewSymbol({ ...newSymbol, html: e.target.value });
              }}
            />
            <InputData
              label="Alt Code"
              id="altCode"
              placeholder="Alt Code"
              value={newSymbol.code}
              handleChange={(e) => {
                setNewSymbol({ ...newSymbol, code: e.target.value });
              }}
            />
          </div>
        </div>
        {/* 태그 영역 */}
        <label
          htmlFor="add_tag_0"
          className="text-sm font-semibold text-gray-600 flex items-center justify-start my-2"
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
              className="bg-white text-black border px-2 py-1 rounded text-xs mb-1 w-full h-7"
            />
          ))}
        </div>

        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm cursor-pointer hover:bg-blue-400 active:bg-blue-200 w-full mt-2"
        >
          확인
        </button>
      </form>
    </div>
  );
}
