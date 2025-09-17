"use client";

import { SymbolItemType } from "@/app/symbols/types";
import DetailToInfo from "@/app/symbols/components/sideBar/DetailToInfo";
import NameList from "./NameList";
import { useEffect, useState } from "react";
import nameValidation from "@/app/symbols/lib/validation/nameValidation";
import Message from "./Message";
import { useMessageStore } from "../../hooks/useMessageStore";

interface UpdateTabProps {
  symbolData: SymbolItemType;
}

export default function UpdateTab({ symbolData }: UpdateTabProps) {
  const [addNameValue, setAddNameValue] = useState("");
  const [submitNameList, setSubmitNameList] = useState(symbolData.name);
  const { setMessage } = useMessageStore();

  const handleAddNameClick = () => {
    const validation = nameValidation(submitNameList, addNameValue);
    setMessage(validation);
    if (validation.state === "error") return;
    setSubmitNameList((prev) => [...prev, addNameValue]);
    setAddNameValue("");
  };

  const handleDeleteNameClick = (deleteName: string) => {
    setSubmitNameList((prev) => prev.filter((name) => name !== deleteName));
  };

  useEffect(() => {
    setSubmitNameList(symbolData.name);
    setAddNameValue("");
  }, [symbolData]);

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
              value={symbolData?.unicode}
              element="input"
              dependencyData={symbolData}
            />
            <DetailToInfo
              label="HTML"
              value={symbolData?.html}
              element="input"
              dependencyData={symbolData}
            />
            <DetailToInfo
              label="윈도우코드"
              value={symbolData?.code}
              element="input"
              dependencyData={symbolData}
            />
          </div>
        </div>
        <NameList
          nameList={submitNameList}
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
        <Message />
      </div>
      <div className="flex flex-col gap-3 items-center justify-center mx-10">
        <button
          type="button"
          className="p-2 rounded-2xl w-full mx-auto bg-blue-400 cursor-pointer"
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
