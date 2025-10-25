import { requireSession } from "@/lib/auth/session";
import ClientPage from "./components/ClientPage";
export default async function calendarPage() {
  await requireSession();

  return (
    <>
      <ClientPage />
      <div className="h-screen flex justify-center items-center">
        <iframe
          src="https://calendar.google.com/calendar/embed?src=youremail%40gmail.com&ctz=Asia/Seoul"
          style={{ border: 0 }}
          width="800"
          height="600"
        ></iframe>
      </div>
    </>
  );
}
