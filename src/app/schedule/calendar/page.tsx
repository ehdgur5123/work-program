import { requireSession } from "@/lib/auth/session";
import ClientPage from "./components/ClientPage";

export default async function calendarPage() {
  await requireSession();

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <h1 className="text-5xl text-center p-2 m-10">구글 캘린더</h1>
        <ClientPage />
        <div className="h-20"></div>
      </div>
    </div>
  );
}
