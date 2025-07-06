// app/api/page-links/route.ts
import { NextRequest, NextResponse } from "next/server";
import links from "./links.json";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const search = searchParams.get("search")?.toLowerCase();

  // 검색어가 있으면 필터링
  const filtered = search
    ? links.filter(
        (link) =>
          link.title.toLowerCase().includes(search) ||
          link.url.toLowerCase().includes(search) ||
          link.category.large.toLowerCase().includes(search)
      )
    : links;

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = filtered.slice(start, end);

  return NextResponse.json({
    data: paginatedData,
    page,
    limit,
    total: filtered.length,
    totalPages: Math.ceil(filtered.length / limit),
  });
}
