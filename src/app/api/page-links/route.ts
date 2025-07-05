// app/api/page-links/route.ts
import { NextRequest, NextResponse } from "next/server";
import links from "./links.json";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedData = links.slice(start, end);

  return NextResponse.json({
    data: paginatedData,
    page,
    limit,
    total: links.length,
    totalPages: Math.ceil(links.length / limit),
  });
}
