"use client";

import { SymbolItemType } from "@/app/symbols/types";
import SymbolForm from "@/app/symbols/components/sideBar/SymbolForm";
import { useEffect, useState } from "react";
import Message from "./Message";
import CrudButton from "../sideBar/CrudButton";
import { useMessageStore } from "@/app/symbols/hooks/useMessageStore";
import { useSymbolStore } from "@/app/symbols/hooks/useSymbolStore";
import useDeleteSymbol from "@/app/symbols/hooks/useDeleteSymbol";

interface UpdateTabProps {
  symbolData: SymbolItemType;
}

export default function UpdateTab({ symbolData }: UpdateTabProps) {
  const [updatedSymbol, setUpdatedSymbol] =
    useState<SymbolItemType>(symbolData);
  const { mutate: deleteSymbolMutate } = useDeleteSymbol();
  const { setMessage } = useMessageStore();

  useEffect(() => {
    setUpdatedSymbol(symbolData);
  }, [symbolData]);

  // 서버에 전송
  const handleSubmit = () => {
    console.log(updatedSymbol);
  };

  const handleDelete = () => {
    deleteSymbolMutate(symbolData._id, {
      onSuccess: () => {
        setMessage({ text: "삭제가 완료되었습니다.", state: "success" });
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
        <CrudButton text="삭제" handleClick={handleDelete} color="red" />
      </div>
    </div>
  );
}
