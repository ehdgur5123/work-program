import { SymbolItemType } from "@/app/symbols/types";
import SymbolForm from "./SymbolForm";

interface InformationTabProps {
  symbolData: SymbolItemType;
}

export default function InformationTab({ symbolData }: InformationTabProps) {
  return <SymbolForm symbolData={symbolData} mode="information" />;
}
