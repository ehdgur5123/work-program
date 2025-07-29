// app/api/page-links/route.ts
import { NextRequest, NextResponse } from "next/server";
import links from "@/app/page-links/api/links.json";
// import { connectToDatabase } from "@/lib/mongodb";
// import { LinksModel } from "@/app/page-links/models/links"

export async function GET(req: NextRequest) {
  // await connectToDatabase();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const search = searchParams.get("search")?.toLowerCase();
  const large = searchParams.get("large")?.toLowerCase();
  const medium = searchParams.get("medium")?.toLowerCase();
  const small = searchParams.get("small")?.toLowerCase();

  // 검색어가 있으면 필터링
  const filtered = links.filter((link) => {
    const matchesLarge =
      !large || link.category.large.toLowerCase().includes(large);
    const matchesMedium =
      !medium || link.category.medium.toLowerCase().includes(medium);
    const matchesSmall =
      !small || link.category.small.toLowerCase().includes(small);
    const matchesSearch =
      !search ||
      link.title.toLowerCase().includes(search) ||
      link.url.toLowerCase().includes(search) ||
      link.category.large.toLowerCase().includes(search) ||
      link.category.medium.toLowerCase().includes(search) ||
      link.category.small.toLowerCase().includes(search);

    return matchesSearch && matchesLarge && matchesMedium && matchesSmall;
  });

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
