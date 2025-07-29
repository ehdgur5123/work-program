import axios from "@/lib/axios";
import { SymbolItem } from "@/app/symbol-search/types";

interface InstanceError {
  message: string;
  response?: {
    status: number;
  };
}

const URL = "/symbol-search/api/symbols";

export async function fetchSymbols(): Promise<SymbolItem[] | null> {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (err) {
    console.error("❌ 심볼 가져오기 실패:", err);
    return null;
  }
}

export async function fetchAddSymbol(data: {
  symbol: string;
  unicode?: string;
  html?: string;
  name?: string[] | null;
  code?: string;
}): Promise<SymbolItem | "EXISTS" | null> {
  const filteredNames = data.name
    ? data.name.filter((n) => n.trim() !== "")
    : [];

  const payload = {
    symbol: data.symbol,
    unicode: data.unicode && data.unicode.trim() !== "" ? data.unicode : "None",
    html: data.html && data.html.trim() !== "" ? data.html : "None",
    code: data.code && data.code.trim() !== "" ? data.code : "None",
    name: filteredNames,
  };

  try {
    const response = await axios.post(URL, payload);
    return response.data;
  } catch (error: unknown) {
    const err = error as InstanceError;
    if (err.response && err.response.status === 409) {
      console.warn("⚠️ 이미 존재하는 기호입니다.");
      return "EXISTS";
    }
    console.error("❌ 심볼 추가 실패:", err);
    return null;
  }
}

export async function fetchDeleteSymbols(
  ids: string[]
): Promise<SymbolItem | null> {
  try {
    const response = await axios.delete(URL, { data: { ids } });
    return response.data;
  } catch (err) {
    console.error("❌ 기호 삭제 실패:", err);
    return null;
  }
}

export async function fetchUpdateSymbol(
  id: string,
  symbolToModify: Partial<SymbolItem>
): Promise<SymbolItem | null> {
  try {
    const response = await axios.put(`${URL}/${id}`, symbolToModify);
    return response.data;
  } catch (err) {
    console.error("❌ 기호 업데이트 실패:", err);
    return null;
  }
}
