import axios from "@/lib/axios";

export async function getSymbols() {
  const res = await axios.get("/symbols/api");
  return res.data;
}
