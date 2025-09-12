import DetailToInfo from "./DetailToInfo";
import { SymbolItemType } from "@/app/symbols/types";

interface InfoToSymbolProps {
  symbolData: SymbolItemType | null;
  buttonMode: string;
}
export default function InfoToSymbol({ symbolData }: InfoToSymbolProps) {
  return (
    <div className="flex items-center justify-center gap-5 border-2 p-5 mx-auto w-fit">
      <div className="flex border h-40 min-w-40 items-center justify-center text-5xl">
        <p>{symbolData ? symbolData.symbol : "None"}</p>
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
