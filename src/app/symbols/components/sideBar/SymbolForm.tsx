import DetailToInfo from "@/app/symbols/components/sideBar/DetailToInfo";
import { SymbolItemType } from "@/app/symbols/types";
import NameList from "./NameList";
import { useMessageStore } from "../../hooks/useMessageStore";
import { useEffect, useState } from "react";
import {
  nameAddValidation,
  nameDeleteValidation,
} from "@/app/symbols/lib/validation/updateValidation";

interface SymbolFormProps {
  symbolData: SymbolItemType;
  mode: "information" | "create" | "update";
  setSymbolData?: React.Dispatch<React.SetStateAction<SymbolItemType>>;
}

export default function SymbolForm({
  symbolData,
  mode,
  setSymbolData,
}: SymbolFormProps) {
  const [addNameValue, setAddNameValue] = useState("");
  const { setMessage } = useMessageStore();

  // 기호이름 추가 함수
  const handleAddNameClick = () => {
    const validation = nameAddValidation(symbolData.name, addNameValue);
    setMessage(validation);
    if (validation.state === "error") return;
    setSymbolData?.((prev) => ({
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
    setSymbolData?.((prev) => ({
      ...prev,
      name: prev.name.filter((name) => name !== deleteName),
    }));
  };

  // 다른기호 선택시 상태 초기화
  useEffect(() => {
    setSymbolData?.(symbolData);
    setAddNameValue("");
  }, [symbolData]);

  return (
    <div className="mt-8 mx-7 flex flex-col gap-3 border-2 items-center justify-center p-3 min-w-[330px] ">
      <div className="flex gap-5 w-full">
        {mode === "create" ? (
          <input
            className="flex h-40 text-5xl w-full bg-white text-center text-black"
            maxLength={1}
            value={symbolData.symbol}
            onChange={(e) =>
              setSymbolData?.((prev) => ({ ...prev, symbol: e.target.value }))
            }
          />
        ) : (
          <div className="flex flex-1 border h-40 items-center justify-center text-5xl">
            {symbolData?.symbol}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <DetailToInfo
            label="ID"
            value={mode === "create" ? "자동생성" : symbolData._id}
          />
          <DetailToInfo
            label="유니코드"
            value={symbolData.unicode}
            element={mode === "information" ? "div" : "input"}
            onChange={
              mode === "information"
                ? () => {}
                : (newValue) =>
                    setSymbolData?.((prev) => ({
                      ...prev,
                      unicode: newValue,
                    }))
            }
          />
          <DetailToInfo
            label="HTML"
            value={symbolData.html}
            element={mode === "information" ? "div" : "input"}
            onChange={
              mode === "information"
                ? () => {}
                : (newValue) =>
                    setSymbolData?.((prev) => ({ ...prev, html: newValue }))
            }
          />
          <DetailToInfo
            label="윈도우코드"
            value={symbolData.code}
            element={mode === "information" ? "div" : "input"}
            onChange={
              mode === "information"
                ? () => {}
                : (newValue) =>
                    setSymbolData?.((prev) => ({ ...prev, code: newValue }))
            }
          />
        </div>
      </div>
      <NameList
        nameList={symbolData?.name}
        isEditable={mode === "information" ? false : true}
        onDelete={mode === "information" ? () => {} : handleDeleteNameClick}
      />
      {mode === "information" ? null : (
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
      )}
    </div>
  );
}
