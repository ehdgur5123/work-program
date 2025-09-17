export interface SymbolItemType {
  _id: string;
  symbol: string;
  unicode: string;
  html: string;
  name: string[];
  code: string;
}

export interface MessageType {
  text: string;
  state: "success" | "error" | "warning" | "";
}
