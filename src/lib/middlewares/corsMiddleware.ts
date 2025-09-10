// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const allowedOrigins = [
    "https://work-program.vercel.app",
    "http://localhost:3000",
  ];
  const origin = req.headers.get("origin");
  if (origin && allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    // res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    // res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }
  return res;
}

// matcher로 어느 경로에 적용할지 지정
export const config = {
  matcher: ["/symbols/api/:path*", "/disaster-map/api/:path*"],
};
