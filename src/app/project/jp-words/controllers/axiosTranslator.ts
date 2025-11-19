import axios from "@/lib/axios";

const URL = "/project/jp-words/api";

export async function getTest() {
  const res = await axios.get(URL);
  return res.data;
}
