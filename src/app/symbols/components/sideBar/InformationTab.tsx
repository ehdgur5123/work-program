import DetailToInfo from "@/app/symbols/components/sideBar/DetailToInfo";
import { SymbolItemType } from "@/app/symbols/types";
import NameList from "./NameList";

interface InformationTabProps {
  symbolData: SymbolItemType;
}

export default function InformationTab({ symbolData }: InformationTabProps) {
  return (
    <div className="mt-8 mx-7 flex flex-col gap-3 border-2 items-center justify-center p-3 min-w-[330px] ">
      <div className="flex gap-5 w-full">
        <div className="flex flex-1 border h-40 items-center justify-center text-5xl">
          {symbolData?.symbol}
        </div>
        <div className="flex flex-col gap-2">
          <DetailToInfo label="ID" value={symbolData?._id} />
          <DetailToInfo label="유니코드" value={symbolData?.unicode} />
          <DetailToInfo label="HTML" value={symbolData?.html} />
          <DetailToInfo label="윈도우코드" value={symbolData?.code} />
        </div>
      </div>
      <NameList nameList={symbolData?.name} />
    </div>
  );
}
