"use client";

import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import InformationTab from "./InformationTab";
import CreateTab from "./CreateTab";
import UpdateTab from "./UpdateTab";
import { useSymbolStore } from "@/app/symbols/hooks/useSymbolStore";
import { useMessageStore } from "@/app/symbols/hooks/useMessageStore";

export default function SideBar() {
  const tabList = ["정보", "생성", "수정·삭제"];
  const [selectedTab, setSelectedTab] = useState("정보");
  const symbolData = useSymbolStore((state) => state.symbolData);

  // 다른 기호 선택 시, 메시지 초기화
  useEffect(() => {
    useMessageStore.getState().clearMessage();
  }, [symbolData]);

  return (
    <div className="sticky flex flex-col p-5 top-[14%] min-w-[400px]">
      <div className="flex flex-row">
        {tabList.map((label) => (
          <TabButton
            key={label}
            label={label}
            isSelected={selectedTab === label}
            onClick={() => setSelectedTab(label)}
          />
        ))}
      </div>
      <div className="h-[630px] border">
        {!symbolData && (
          <div className="flex items-center justify-center text-4xl h-full">
            기호를 선택해주세요.
          </div>
        )}
        {symbolData && selectedTab === "정보" && (
          <InformationTab symbolData={symbolData} />
        )}
        {symbolData && selectedTab === "생성" && <CreateTab />}
        {symbolData && selectedTab === "수정·삭제" && (
          <UpdateTab symbolData={symbolData} />
        )}
      </div>
    </div>
  );
}
