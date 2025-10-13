// app/api/symbols/[id]/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "../../models/symbol";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

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
    const symbol = await SymbolModel.deleteOne({ _id: id });
    revalidatePath("/symbols");
    return NextResponse.json(symbol, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    await connectToDatabase();
    const symbol = await SymbolModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!symbol) {
      return NextResponse.json({ error: "Symbol not found" }, { status: 404 });
    }
    revalidatePath("/symbols");
    return NextResponse.json(symbol, { status: 200 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
