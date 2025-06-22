// app/api/symbols/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/Symbol";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const symbols = await SymbolModel.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { code: { $regex: search, $options: "i" } },
      { symbol: { $regex: search, $options: "i" } },
    ],
  });

  return NextResponse.json(symbols);
}
