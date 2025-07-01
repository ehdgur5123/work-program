"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ClientSideSymbol from "@/app/symbols/components/ClientSideSymbol";
import ScrollToTop from "@/app/symbols/components/ScrollToTop";
import LoadingSpinner from "../loading";
import { SymbolItem } from "@/app/symbols/types";

export default function ClientSide() {
  const [symbols, setSymbols] = useState<SymbolItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SymbolItem[]>("/api/symbols");
        setSymbols(response.data);
      } catch (error) {
        console.error("심볼 데이터 로딩 실패:", error);
        setSymbols([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (!symbols || symbols.length === 0) {
    return <p>심볼데이터가 없습니다.</p>;
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
