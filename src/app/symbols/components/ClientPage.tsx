"use client";
import { useEffect, useState } from "react";
import ClientSideSymbol from "@/app/symbols/components/ClientSideSymbol";
import ScrollToTop from "@/app/symbols/components/ScrollToTop";
import LoadingSpinner from "../loading";
import { SymbolItem } from "@/app/symbols/types";
import { fetchSymbols } from "../controllers/fetchSymbols";

export default function ClientPage() {
  const [symbols, setSymbols] = useState<SymbolItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSymbols();
        setSymbols(response);
      } catch (error) {
        console.error("심볼 데이터 로딩 실패:", error);
        setSymbols([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {}, [symbols]);

  if (loading) return <LoadingSpinner />;

  if (!symbols || symbols.length === 0) {
    return <p>No Symbol Data</p>;
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <ClientSideSymbol initialSymbols={symbols} />
      </div>
      <ScrollToTop />
    </>
  );
}
