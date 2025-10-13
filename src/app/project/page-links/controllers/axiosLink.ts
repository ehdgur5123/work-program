import axios from "@/lib/axios";
import { PaginatedLinkResponse, LinkItem } from "../types";

const SERVER_URL = "/project/page-links/api";
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

export async function deleteToURL(id: string) {
  try {
    const response = await axios.delete(`${SERVER_URL}/${id}`);
    return response.data;
  } catch (err) {
    console.error("❌  삭제 실패:", err);
    return null;
  }
}

export async function patchToURL(updatedData: LinkItem) {
  try {
    const response = await axios.patch(
      `${SERVER_URL}/${updatedData._id}`,
      updatedData
    );
    return response.data;
  } catch (err) {
    console.error("❌ 수정 실패:", err);
    return null;
  }
}
