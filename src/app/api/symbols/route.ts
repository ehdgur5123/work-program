// app/api/symbols/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/Symbol";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  await connectToDatabase();
  const symbols = await SymbolModel.find({});

  const res = NextResponse.json(symbols);
  res.headers.set("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용 (필요 시 조절)
  revalidatePath("/symbols");
  return res;
}

// CORS 프리플라이트 요청 처리
export async function OPTIONS() {
  return new Response(null, {
    status: 204, // No Content
    headers: {
      "Access-Control-Allow-Origin": "*", // 모든 도메인 허용 (필요 시 조절)
      "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
