// app/api/symbols/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbol-search/models/symbol";
import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  await connectToDatabase();
  const symbols = await SymbolModel.find({});

  const res = NextResponse.json(symbols);
  res.headers.set("Access-Control-Allow-Origin", "*"); // 모든 도메인 허용 (필요 시 조절)
  revalidatePath("/symbols");
  return res;
}
