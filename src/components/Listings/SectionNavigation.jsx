import { ChevronLeft, ChevronRight } from "lucide-react";

export function SectionNavigation() {
  return (
    <div className="flex gap-2">
      <button className="p-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow disabled:opacity-50">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button className="p-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
