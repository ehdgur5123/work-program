import axios from "@/lib/axios";
import { SymbolItem } from "@/app/symbols/types";

export async function fetchSymbols(
  search: string
): Promise<SymbolItem[] | null> {
  try {
    const response = await axios.get("/symbols", {
      params: { search },
      headers: {
        "Cache-Control": "no-store", // ✅ 캐시 사용하지 않도록 설정
      },
    });
    return response.data;
  } catch (err) {
    console.error("❌ 심볼 가져오기 실패:", err);
    return null;
  }
}

export async function fetchAddName(
  id: string,
  name: string
): Promise<SymbolItem[] | null> {
  try {
    const response = await axios.patch(`/symbols/${id}`, { name });
    return response.data;
  } catch (err) {
    console.error("❌ 태그 추가 실패:", err);
    return null;
  }
}

export async function fetchDeleteName(
  id: string,
  name: string
): Promise<SymbolItem | null> {
  try {
    const response = await axios.delete(`/symbols/${id}`, { data: { name } });
    return response.data;
  } catch (err) {
    console.error("❌ 태그 삭제 실패:", err);
    return null;
  }
}

export async function fetchDeleteSymbol(
  id: string
): Promise<SymbolItem | null> {
  try {
    const response = await axios.delete(`/symbols/${id}`);
    return response.data;
  } catch (err) {
    console.error("❌ 기호 삭제 실패:", err);
    return null;
  }
}
