"use client";

import { useState } from "react";
import DetailToInfo from "./DetailToInfo";
import { SymbolItemType } from "@/app/symbols/types";

interface InfoToSymbolProps {
  symbolData: SymbolItemType | null;
  buttonMode: string;
}
export default function InfoToSymbol({
  symbolData,
  buttonMode,
}: InfoToSymbolProps) {
  const [symbolValue, setSymbolValue] = useState("");

  return (
    <div className="flex items-center justify-center gap-5 border-2 p-5 mx-auto w-full">
      <div className="flex border h-40 min-w-40 max-w-40 items-center justify-center text-5xl">
        {buttonMode === "create" ? (
          <input
            type="text"
            className="bg-white text-black h-full w-full text-center"
            value={symbolValue}
            onChange={(e) => setSymbolValue(e.target.value)}
            maxLength={1}
          />
        ) : (
          <p>{symbolData ? symbolData.symbol : "None"}</p>
        )}
      </div>
      <div className="flex flex-col justify-between flex-1">
        <DetailToInfo label="ID" value={symbolData?._id} />
        <DetailToInfo label="유니코드" value={symbolData?.unicode} />
        <DetailToInfo label="HTML" value={symbolData?.html} />
        <DetailToInfo label="윈도우코드" value={symbolData?.code} />
      </div>
    </div>
  );
}
