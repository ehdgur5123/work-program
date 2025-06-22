import { connectToDatabase } from "@/lib/mongodb";
import { SymbolModel } from "@/app/symbols/models/Symbol";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: Request, context: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const symbol = await SymbolModel.findById(id);

    if (!symbol) {
      return NextResponse.json({ error: "Symbol not found" }, { status: 404 });
    }

    return NextResponse.json(symbol);
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching symbol" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "잘못된 name" }, { status: 400 });
    }
    const updated = await SymbolModel.findByIdAndUpdate(
      id,
      { $addToSet: { name } }, // 중복 방지
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "업데이트 실패" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "잘못된 name" }, { status: 400 });
    }
    const updated = await SymbolModel.findByIdAndUpdate(
      id,
      { $pull: { name } }, // ✅ 배열에서 name 하나 삭제
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
