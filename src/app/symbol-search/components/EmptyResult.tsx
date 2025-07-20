import { Ghost } from "lucide-react";

export default function EmptyResult() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-12">
      <Ghost className="h-50 w-50 mb-4" />
      <h4 className="text-5xl font-semibold">No Results Found</h4>
      <p className="mt-2 text-2xl">Try adjusting your search or filters.</p>
    </div>
  );
}
