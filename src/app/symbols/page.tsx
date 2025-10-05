import { requireSession } from "@/lib/auth/session";
import ClientPage from "./components/ClientPage";
import SideBarToggle from "@/app/symbols/components/sideBar/SideBarToggle";
import ClientOnly from "@/app/symbols/components/ClientOnly";

export default async function SymbolsPage() {
  await requireSession();

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <h1 className="text-5xl text-center p-2 m-10">기호검색</h1>
        <ClientPage />
        <div className="h-20"></div>
      </div>
      <ClientOnly>
        <SideBarToggle />
      </ClientOnly>
    </div>
  );
}
