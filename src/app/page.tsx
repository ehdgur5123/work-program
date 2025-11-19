import ProjectList from "@/app/components/ProjectList";
import CalendarPanel from "@/app/components/panel/CalendarPanel";

export default function Home() {
  return (
    <div className=" w-full md:max-w-4/5 md:mx-auto min-h-screen flex gap-3 p-3">
      <div className="flex-1 p-2">
        <ProjectList />
      </div>
      <div className="hidden md:block p-2 h-fit min-w-[350px]">
        <CalendarPanel />
      </div>
    </div>
  );
}
