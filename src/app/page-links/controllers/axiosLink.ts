import axios from "@/lib/axios";
import { PaginatedLinkResponse } from "../types";

const SERVER_URL = "/page-links/api";
const LIMIT = 5;

export async function getToLink(
  page: number = 1,
  search: string | null = null,
  large: string | null = null,
  medium: string | null = null,
  small: string | null = null
): Promise<PaginatedLinkResponse> {
  const response = await axios.get(SERVER_URL, {
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
  const response = await axios.get(`${SERVER_URL}/category`);
  return response.data;
}

export async function postToURL(queryValue: {
  URL: string;
  large: string;
  medium: string;
  small: string;
}) {
  const { URL, large, medium, small } = queryValue;

  const payload = {
    url: URL,
    category: {
      large: large,
      medium: medium,
      small: small,
    },
  };

  const response = await axios.post(`${SERVER_URL}`, payload);
  return response.data;
}
