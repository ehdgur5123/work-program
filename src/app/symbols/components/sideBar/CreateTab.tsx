"use client";

import { SymbolItemType } from "@/app/symbols/types";
import { useState } from "react";
import Message from "./Message";
import SymbolForm from "./SymbolForm";
import CrudButton from "../sideBar/CrudButton";
import useCreatedSymbol from "../../hooks/useCreatedSymbol";
import { symbolCreateValidation } from "@/app/symbols/lib/validation/symbolValidation";
import { useMessageStore } from "../../hooks/useMessageStore";
import { useSymbolStore } from "@/app/symbols/hooks/useSymbolStore";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateTab() {
  const { mutate: createSymbolMutate, isPending } = useCreatedSymbol();
  const { setMessage } = useMessageStore();
  const setSymbolData = useSymbolStore((state) => state.setSymbolData);
  const queryClient = useQueryClient();
  const symbolDataList =
    queryClient.getQueryData<SymbolItemType[]>(["symbols"]) ?? [];

  const initialSymbolData = {
    _id: "",
    symbol: "",
    unicode: "",
    html: "",
    name: [],
    code: "",
  };
  const [createdSymbol, setCreatedSymbol] =
    useState<SymbolItemType>(initialSymbolData);

  const normalization = (symbol: SymbolItemType): SymbolItemType => {
    return {
      ...symbol,
      code: symbol.code === "" ? "None" : symbol.code,
      html: symbol.html === "" ? "None" : symbol.html,
      unicode: symbol.unicode === "" ? "None" : symbol.unicode,
    };
  };

  const handleSubmit = () => {
    const validation = symbolCreateValidation(createdSymbol, symbolDataList);
    setMessage(validation);
    if (validation.state === "error") return;

    const normalized = normalization(createdSymbol);
    const { _id, ...symbolWithoutId } = normalized;
    console.log(_id);
    createSymbolMutate(symbolWithoutId, {
      onSuccess: (data) => {
        setSymbolData(data);
        setCreatedSymbol(initialSymbolData);
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <SymbolForm
        mode="create"
        symbolData={createdSymbol}
        setSymbolData={setCreatedSymbol}
      />
      <div className="h-6">
        <Message />
      </div>
      <div className="flex flex-col gap-3 items-center justify-center mx-10">
        <CrudButton
          text={isPending ? "저장 중..." : "저장"}
          handleClick={handleSubmit}
          color="blue"
          disabled={isPending ? true : false}
        />
      </div>
    </div>
  );
}
