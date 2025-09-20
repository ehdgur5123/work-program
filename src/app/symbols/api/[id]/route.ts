// app/api/symbols/[id]/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/symbol";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectToDatabase();
    const symbol = await SymbolModel.findOne({ _id: id });

    return NextResponse.json(symbol, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const symbols = await SymbolModel.deleteOne({ _id: id });
    return NextResponse.json(symbols, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
