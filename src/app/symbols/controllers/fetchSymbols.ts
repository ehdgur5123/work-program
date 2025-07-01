import axios from "@/lib/axios";
import { SymbolItem } from "@/app/symbols/types";

interface InstanceError {
  message: string;
  response?: {
    status: number;
  };
}

export async function fetchSymbols(): Promise<SymbolItem[] | null> {
  try {
    const response = await axios.get("/symbols");
    return response.data;
  } catch (err) {
    console.error("❌ 심볼 가져오기 실패:", err);
    return null;
  }
}

export async function fetchAddName(
  id: string,
  name: string
): Promise<SymbolItem | null> {
  try {
    const response = await axios.patch(`/symbols/${id}`, { name });
    return response.data;
  } catch (err) {
    console.error("❌ 태그 추가 실패:", err);
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
    const response = await axios.post(`/symbols`, payload);
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
