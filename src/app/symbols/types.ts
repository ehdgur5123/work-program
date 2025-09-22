export interface SymbolItemType {
  _id: string;
  symbol: string;
  unicode: string;
  html: string;
  name: string[];
  code: string;
}

export type updatedSymbolItemType = Partial<Omit<SymbolItemType, "_id">>;

export interface MessageType {
  text: string;
  state: "success" | "error" | "warning" | "";
}
