"use client";

import { SymbolItemType } from "@/app/symbols/types";
import DetailToInfo from "@/app/symbols/components/sideBar/DetailToInfo";
import NameList from "./NameList";
import { useEffect, useState } from "react";
import {
  nameAddValidation,
  nameDeleteValidation,
} from "@/app/symbols/lib/validation/updateValidation";
import Message from "./Message";
import { useMessageStore } from "../../hooks/useMessageStore";

export default function CreateTab() {
  const [createdSymbol, setCreatedSymbol] = useState<SymbolItemType>({
    _id: "",
    symbol: "",
    unicode: "",
    html: "",
    name: [],
    code: "",
  });
  const [addNameValue, setAddNameValue] = useState("");
  const { setMessage } = useMessageStore();
  const handleClick = () => {
    console.log(createdSymbol);
  };

  // 기호이름 추가 함수
  const handleAddNameClick = () => {
    const validation = nameAddValidation(createdSymbol.name, addNameValue);
    setMessage(validation);
    if (validation.state === "error") return;
    setCreatedSymbol((prev) => ({
      ...prev,
      name: [...prev.name, addNameValue],
    }));
    setAddNameValue("");
  };

  // 기호이름 삭제 함수
  const handleDeleteNameClick = (deleteName: string) => {
    const validation = nameDeleteValidation(deleteName);
    setMessage(validation);
    if (validation.state === "error") return;
    setCreatedSymbol((prev) => ({
      ...prev,
      name: prev.name.filter((name) => name !== deleteName),
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mt-8 flex flex-col gap-3 border-2 items-center justify-center p-3 mx-7">
        <div className="flex gap-5 w-full">
          <input
            className="flex h-40 text-5xl w-full bg-white text-center text-black"
            maxLength={1}
            value={createdSymbol.symbol}
            onChange={(e) =>
              setCreatedSymbol((prev) => ({ ...prev, symbol: e.target.value }))
            }
          />

          <div className="flex flex-col gap-2">
            <DetailToInfo label="ID" value="자동생성" />
            <DetailToInfo
              label="유니코드"
              element="input"
              value={createdSymbol.unicode}
              onChange={(newValue) =>
                setCreatedSymbol((prev) => ({ ...prev, unicode: newValue }))
              }
            />
            <DetailToInfo
              label="HTML"
              element="input"
              value={createdSymbol.html}
              onChange={(newValue) =>
                setCreatedSymbol((prev) => ({ ...prev, html: newValue }))
              }
            />
            <DetailToInfo
              label="윈도우코드"
              element="input"
              value={createdSymbol.code}
              onChange={(newValue) =>
                setCreatedSymbol((prev) => ({ ...prev, code: newValue }))
              }
            />
          </div>
        </div>
        <NameList
          nameList={createdSymbol?.name}
          isEditable={true}
          onDelete={handleDeleteNameClick}
        />
        <div className="flex flex-row gap-2 p-2">
          <input
            type="text"
            className="bg-white text-black pl-2"
            placeholder="기호 이름을 입력하세요."
            value={addNameValue}
            onChange={(e) => setAddNameValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddNameClick();
              }
            }}
          />
          <button
            type="button"
            className="border py-1 px-2 cursor-pointer hover:bg-gray-400"
            onClick={handleAddNameClick}
          >
            추가
          </button>
        </div>
      </div>
      <div className="h-6">
        <Message />
      </div>
      <div className="flex flex-col gap-3 items-center justify-center mx-10">
        <button
          type="button"
          className="p-2 rounded-2xl w-full mx-auto bg-blue-400 cursor-pointer"
          onClick={handleClick}
        >
          저장
        </button>
      </div>
    </div>
  );
}
