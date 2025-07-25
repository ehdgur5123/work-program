import { requireSession } from "@/lib/auth/session";
import ClientPage from "./components/ClientPage";

export default async function SymbolSearchPage() {
  await requireSession();
  return <ClientPage />;
}
