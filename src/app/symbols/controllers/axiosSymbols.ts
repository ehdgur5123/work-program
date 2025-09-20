import axios from "@/lib/axios";

const URL = "/symbols/api";

export async function getSymbols() {
  const res = await axios.get(URL);
  return res.data;
}

export async function deleteSymbol(id: string) {
  const res = await axios.delete(`${URL}/${id}`);
  return res.data;
}
