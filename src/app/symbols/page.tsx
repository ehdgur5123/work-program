import { fetchSymbols } from "@/app/symbols/controllers/fetchSymbols";
import ClientSideSymbol from "./components/ClientSideSymbol";
import ScrollToTop from "./components/ScrollToTop";

export default async function SymbolPage() {
  const initialSymbols = await fetchSymbols();

  if (!initialSymbols || initialSymbols.length === 0)
    return <p>심볼데이터가 없습니다.</p>;

  return (
    <>
      <div className="text-6xl md:text-6xl text-center p-3 m-2 md:p-5 md:m-20">
        기호찾기
      </div>

      <div className="flex items-center justify-center">
        <ClientSideSymbol initialSymbols={initialSymbols || []} />
      </div>
      <div className="h-20"></div>
      <ScrollToTop />
    </>
  );
}
