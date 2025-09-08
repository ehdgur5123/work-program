import axios from "@/lib/axios";

const SERVER_URL = "/disaster-map/api/flood";
const SERVER_URL_LOAD = "/disaster-map/api/flood/load";
const SERVER_URL_CONVERT = "/disaster-map/api/flood/convert";

export async function getFloodTraces(limit = 10, offset = 1) {
  const response = await axios.get(SERVER_URL, {
    params: { limit, offset },
  });
  return response.data;
}

export async function getFloodTracesLoad() {
  const response = await axios.get(SERVER_URL_LOAD);
  return response.data;
}

export async function getFloodTracesConvert() {
  const response = await axios.get(SERVER_URL_CONVERT);
  return response.data;
}
