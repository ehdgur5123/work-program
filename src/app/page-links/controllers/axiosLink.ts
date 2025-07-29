import axios from "@/lib/axios";
import { PaginatedLinkResponse } from "../types";

const URL = "/page-links/api";

export async function getToLink(
  page: number = 1,
  search: string | null = null,
  large: string | null = null,
  medium: string | null = null,
  small: string | null = null
): Promise<PaginatedLinkResponse> {
  const LIMIT = 5;

  const response = await axios.get(URL, {
    params: {
      page,
      limit: LIMIT,
      search,
      large,
      medium,
      small,
    },
  });

  return response.data;
}

export async function getToCategory() {
  const response = await axios.get(`${URL}/category`);
  return response.data;
}
