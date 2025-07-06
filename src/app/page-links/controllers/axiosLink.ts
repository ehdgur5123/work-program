import axios from "@/lib/axios";
import { PaginatedLinkResponse } from "../types";

export async function getToLink(
  page: number = 1,
  search: string | null = null
): Promise<PaginatedLinkResponse> {
  const LIMIT = 5;

  const response = await axios.get("/page-links", {
    params: {
      page,
      limit: LIMIT,
      search,
    },
  });

  return response.data;
}
