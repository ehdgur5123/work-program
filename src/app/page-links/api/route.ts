// app/api/page-links/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { LinksModel } from "@/app/page-links/models/links";
import * as cheerio from "cheerio";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "5", 10);
  const search = searchParams.get("search")?.toLowerCase();
  const large = searchParams.get("large")?.toLowerCase();
  const medium = searchParams.get("medium")?.toLowerCase();
  const small = searchParams.get("small")?.toLowerCase();

  const links = await LinksModel.find({});

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

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { url, category } = body;

    // 1. URL 필수 체크 & 유효성 검사
    if (!url) {
      return NextResponse.json({ error: "URL이 필요합니다." }, { status: 400 });
    }
    try {
      new URL(url); // 잘못된 URL이면 예외 발생
    } catch {
      return NextResponse.json({ error: "잘못된 URL입니다." }, { status: 400 });
    }

    // 2. 이미 저장된 URL 체크
    const existingUrl = await LinksModel.findOne({ url });
    if (existingUrl) {
      return NextResponse.json(
        { error: "이미 존재하는 URL 입니다." },
        { status: 409 } // Conflict
      );
    }

    // 3. HTML 가져오기
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json(
        { error: `URL 요청 실패: ${res.status}` },
        { status: res.status }
      );
    }
    const html = await res.text();

    // 4. cheerio로 파싱
    const $ = cheerio.load(html);
    const title = $("title").text() || "";
    const content = $("meta[name='description']").attr("content") || "";

    // 5. favicon 안전하게 추출
    const logo =
      $("link[rel='icon']").attr("href") ||
      $("link[rel='shortcut icon']").attr("href") ||
      $("link[rel='apple-touch-icon']").attr("href") ||
      "";

    let logoUrl: string | null = null;

    if (logo) {
      try {
        logoUrl = logo.startsWith("http") ? logo : new URL(logo, url).href;
      } catch {
        logoUrl = null;
      }
    }

    // fallback: /favicon.ico 시도
    if (!logoUrl) {
      try {
        const faviconUrl = new URL("/favicon.ico", url).href;
        const faviconRes = await fetch(faviconUrl);
        if (faviconRes.ok) logoUrl = faviconUrl;
      } catch {
        logoUrl = null;
      }
    }

    // 6. MongoDB 저장
    const data = { url, title, content, logo: logoUrl, category };
    const newUrl = await LinksModel.create(data);

    return NextResponse.json({ message: "성공", data: newUrl });
  } catch {
    console.error("POST Error:");
    return NextResponse.json(
      { error: "존재하지 않는 URL입니다." },
      { status: 500 }
    );
  }
}
