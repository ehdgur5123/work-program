// app/api/symbols/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/symbol";
import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectToDatabase();
    const symbols = await SymbolModel.find({});

    return NextResponse.json(symbols, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectToDatabase();
    const symbol = await SymbolModel.create(body);
    revalidatePath("/symbols");

    return NextResponse.json(symbol, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
