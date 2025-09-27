import axios from "@/lib/axios";
import {
  updatedSymbolItemType,
  createSymbolItemType,
} from "@/app/symbols/types";
const URL = "/symbols/api";

export async function getSymbols() {
  const res = await axios.get(URL);
  return res.data;
}

export async function deleteSymbol(id: string) {
  const res = await axios.delete(`${URL}/${id}`);
  return res.data;
}

export async function patchSymbol(
  id: string,
  updatedSymbol: updatedSymbolItemType
) {
  const res = await axios.patch(`${URL}/${id}`, updatedSymbol);
  return res.data;
}

export async function postSymbol(createdSymbol: createSymbolItemType) {
  const res = await axios.post(URL, createdSymbol);
  return res.data;
}
