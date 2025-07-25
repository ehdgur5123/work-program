import { requireSession } from "@/lib/auth/session";
import ClientPage from "./components/ClientPage";

export default async function SymbolPage() {
  await requireSession();
  return <ClientPage />;
}
