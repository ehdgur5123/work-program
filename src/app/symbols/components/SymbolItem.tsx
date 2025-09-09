import { SymbolItemType } from "@/app/symbols/types";

interface SymbolItemProps {
  data: SymbolItemType;
}

export default function SymbolItem({ data }: SymbolItemProps) {
  return (
    <div className="flex flex-col gap-1 items-center justify-center border p-1 hover:bg-gray-500 active:scale-95 cursor-pointer">
      <div className="text-2xl">{data.symbol}</div>
      <div className="text-sm">{data.code}</div>
    </div>
  );
}
