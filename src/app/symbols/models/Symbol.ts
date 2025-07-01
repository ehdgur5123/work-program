import { Schema, model, models } from "mongoose";

const SymbolSchema = new Schema({
  symbol: { type: String, required: true, unique: true }, // 기호 자체 (예: "·")
  unicode: { type: String }, // 유니코드 문자열 (예: "U+0000")
  html: { type: String }, // HTML 코드 (예: "&#0;")
  name: { type: [String], default: [] }, // 이름 배열 (예: ["가운데 점"])
  code: { type: String }, // Alt 코드 (예: "0000")
});

export const SymbolModel = models.Symbol || model("Symbol", SymbolSchema);
