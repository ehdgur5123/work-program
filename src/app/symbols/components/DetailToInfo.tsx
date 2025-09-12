interface SymbolInfoProps {
  label: string;
  value?: string;
}

export default function InfoToSymbol({ label, value }: SymbolInfoProps) {
  return (
    <div className="flex p-2 gap-2">
      <div className="border w-24 text-center p-1">{label}</div>
      <div className="flex-1 border py-1 px-2 truncate w-40">{value}</div>
    </div>
  );
}
