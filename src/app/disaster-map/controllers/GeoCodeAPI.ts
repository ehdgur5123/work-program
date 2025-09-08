import axios from "@/lib/axios";

const SERVER_URL = "/disaster-map/api/search";

export async function getGeoCodeSearch(searchData = "") {
  const response = await axios.get(SERVER_URL, {
    params: { searchData },
  });
  return response.data;
}
