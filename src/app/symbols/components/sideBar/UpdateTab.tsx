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

interface UpdateTabProps {
  symbolData: SymbolItemType;
}

export default function UpdateTab({ symbolData }: UpdateTabProps) {
  const [addNameValue, setAddNameValue] = useState("");
  const [updatedSymbol, setUpdatedSymbol] =
    useState<SymbolItemType>(symbolData);

  const { setMessage } = useMessageStore();

  // 기호이름 추가 함수
  const handleAddNameClick = () => {
    const validation = nameAddValidation(updatedSymbol.name, addNameValue);
    setMessage(validation);
    if (validation.state === "error") return;
    setUpdatedSymbol((prev) => ({
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
    setUpdatedSymbol((prev) => ({
      ...prev,
      name: prev.name.filter((name) => name !== deleteName),
    }));
  };

  // 다른기호 선택시 상태 초기화
  useEffect(() => {
    setUpdatedSymbol(symbolData);
    setAddNameValue("");
  }, [symbolData]);

  // 서버에 전송
  const handleSubmit = () => {
    console.log(updatedSymbol);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mt-8 flex flex-col gap-3 border-2 items-center justify-center p-3 mx-7">
        <div className="flex gap-5 w-full">
          <div className="flex flex-1 border h-40 items-center justify-center text-5xl">
            {symbolData?.symbol}
          </div>
          <div className="flex flex-col gap-2">
            <DetailToInfo label="ID" value={symbolData?._id} />
            <DetailToInfo
              label="유니코드"
              value={updatedSymbol?.unicode}
              element="input"
              dependencyData={symbolData}
              onChange={(newValue) =>
                setUpdatedSymbol((prev) => ({ ...prev, unicode: newValue }))
              }
            />
            <DetailToInfo
              label="HTML"
              value={updatedSymbol?.html}
              element="input"
              dependencyData={symbolData}
              onChange={(newValue) =>
                setUpdatedSymbol((prev) => ({ ...prev, html: newValue }))
              }
            />
            <DetailToInfo
              label="윈도우코드"
              value={updatedSymbol?.code}
              element="input"
              dependencyData={symbolData}
              onChange={(newValue) =>
                setUpdatedSymbol((prev) => ({ ...prev, code: newValue }))
              }
            />
          </div>
        </div>
        <NameList
          nameList={updatedSymbol?.name}
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
          onClick={handleSubmit}
        >
          저장
        </button>
        <button
          type="button"
          className="p-2 rounded-2xl w-full mx-auto bg-red-600 cursor-pointer"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
