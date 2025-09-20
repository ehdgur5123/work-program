"use client";

import { SymbolItemType } from "@/app/symbols/types";
import { useState } from "react";
import Message from "./Message";
import SymbolForm from "./SymbolForm";
import CrudButton from "../sideBar/CrudButton";
export default function CreateTab() {
  const [createdSymbol, setCreatedSymbol] = useState<SymbolItemType>({
    _id: "",
    symbol: "",
    unicode: "",
    html: "",
    name: [],
    code: "",
  });

  const handleSubmit = () => {
    console.log(createdSymbol);
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
        <CrudButton text="저장" handleClick={handleSubmit} color="blue" />
      </div>
    </div>
  );
}
