"use client";

import ButtonInBar from "./ButtonInBar";
import { useSymbolStore } from "../hooks/useSymbolStore";
import InfoToSymbol from "./InfoToSymbol";
import { useState } from "react";

export default function SideBar() {
  const symbolData = useSymbolStore((state) => state.symbolData);
  const [buttonMode, setButtonMode] = useState("");

  const handleCreate = () => {
    setButtonMode("create");
  };
  const handleUpdate = () => {
    setButtonMode("update");
  };
  const handleDelete = () => {
    setButtonMode("delete");
  };

  return (
    <div className="sticky flex flex-col gap-5 top-1/5">
      <div className="flex items-center justify-end mx-5">
        <ButtonInBar text="생성" hadleClick={handleCreate} />
      </div>
      <InfoToSymbol symbolData={symbolData} buttonMode={buttonMode} />
      <div className="flex items-center justify-end gap-4 mx-5">
        <ButtonInBar text="수정" hadleClick={handleUpdate} />
        <ButtonInBar text="삭제" hadleClick={handleDelete} />
      </div>
    </div>
  );
}
