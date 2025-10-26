import ProjectList from "@/app/components/ProjectList";
import CalendarPanel from "@/app/components/panel/CalendarPanel";

export default function Home() {
  return (
    <div className="bg-red-400 w-full md:max-w-4/5 md:mx-auto min-h-screen flex gap-3 p-3">
      <div className="flex-1 bg-blue-200 p-2">
        <ProjectList />
      </div>
      <div className="p-2 bg-amber-300 h-[300px] w-[300px]">
        <CalendarPanel />
      </div>
    </div>
  );
}
