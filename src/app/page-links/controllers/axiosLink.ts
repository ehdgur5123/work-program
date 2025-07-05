import axios from "@/lib/axios";

export async function getToLink(page = 1) {
  const LIMIT = 5;
  const response = await axios.get("/page-links", {
    params: {
      page: page,
      limit: LIMIT,
    },
  });

  return response.data;
}
