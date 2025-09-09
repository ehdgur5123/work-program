import { requireSession } from "@/lib/auth/session";
import ClientPage from "./components/ClientPage";
import { getSymbols } from "@/app/symbols/controllers/axiosSymbols";

export default async function SymbolsPage() {
  await requireSession();
  const symbols = await getSymbols();
  return <ClientPage initialData={symbols} />;
}
