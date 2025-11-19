import { requireSession } from "@/lib/auth/session";
import ClientPage from "./components/ClientPage";

export default async function JpWordPage() {
  await requireSession();

  return (
    <div className="flex flex-col">
      <div>이것은 말이여</div>
      <ClientPage />
    </div>
  );
}
