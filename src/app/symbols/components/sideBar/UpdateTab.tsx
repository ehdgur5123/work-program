"use client";

import { SymbolItemType, updatedSymbolItemType } from "@/app/symbols/types";
import SymbolForm from "@/app/symbols/components/sideBar/SymbolForm";
import { useEffect, useState } from "react";
import Message from "./Message";
import CrudButton from "../sideBar/CrudButton";
import { useSymbolStore } from "@/app/symbols/hooks/useSymbolStore";
import useDeleteSymbol from "@/app/symbols/hooks/useDeleteSymbol";
import useUpdateSymbol from "@/app/symbols/hooks/useUpdateSymbol";
import { symbolUpdateValidation } from "@/app/symbols/lib/validation/updateValidation";
import { useMessageStore } from "../../hooks/useMessageStore";
interface UpdateTabProps {
  symbolData: SymbolItemType;
}

export default function UpdateTab({ symbolData }: UpdateTabProps) {
  const [updatedSymbol, setUpdatedSymbol] =
    useState<SymbolItemType>(symbolData);
  const { mutate: deleteSymbolMutate, isPending } = useDeleteSymbol();
  const { mutate: updateSymbolMutate, data: updatedSymbolData } =
    useUpdateSymbol();
  const { setMessage } = useMessageStore();

  useEffect(() => {
    setUpdatedSymbol(symbolData);
  }, [symbolData]);

  // 서버에 수정 요청
  const handleSubmit = () => {
    // 1. 유효성 검사
    const validation = symbolUpdateValidation(symbolData, updatedSymbol);
    setMessage(validation);
    if (validation.state === "error") return;

    // 2. 변경된 필드만 추출
    const patchData: updatedSymbolItemType = {};

    (Object.keys(updatedSymbol) as (keyof SymbolItemType)[])
      .filter((key) => key !== "_id") // _id 제외
      .forEach((key) => {
        const newVal = updatedSymbol[key];
        const oldVal = symbolData[key];

        // 배열은 단순 참조 비교 (원하면 deep compare 가능)
        const changed =
          Array.isArray(newVal) && Array.isArray(oldVal)
            ? newVal.join(",") !== oldVal.join(",")
            : newVal !== oldVal;

        if (changed) {
          patchData[key] = newVal as any;
          console.log(`업데이트: ${key} =`, newVal, "(기존:", oldVal, ")");
        }
      });
    console.log(patchData);
    // 3. mutation 호출
    updateSymbolMutate({ id: symbolData._id, data: patchData });
  };

  // 서버에 삭제 요청
  const handleDelete = () => {
    deleteSymbolMutate(symbolData._id, {
      onSuccess: () => {
        useSymbolStore.getState().clearSymbolData();
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <SymbolForm
        symbolData={updatedSymbol}
        mode="update"
        setSymbolData={setUpdatedSymbol}
      />
      <div className="h-6">
        <Message />
      </div>
      <div className="flex flex-col gap-3 items-center justify-center mx-10">
        <CrudButton text="저장" handleClick={handleSubmit} color="blue" />
        <CrudButton
          text={!isPending ? "삭제" : "삭제 중..."}
          handleClick={handleDelete}
          color={!isPending ? "red" : "gray"}
          disabled={!isPending ? false : true}
        />
      </div>
    </div>
  );
}
