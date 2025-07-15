// Symbol 데이터 타입 정의
export interface SymbolItem {
  _id: string;
  symbol: string;
  unicode: string;
  html: string;
  name: string[];
  code: string;
}

export interface hambergerToggleListType {
  symbolAddToggle: boolean;
  symbolUpdateToggle: boolean;
  symbolDeleteToggle: boolean;
}
