import { Plus, Search } from "lucide-react";

export default function ConnectionSection() {
  return (
    <div className="flex w-full max-w-lg items-center gap-2 p-1.5 bg-white rounded-xl shadow-sm border border-gray-200/60 transition-all focus-within:shadow-md focus-within:border-blue-500/50 focus-within:ring-4 focus-within:ring-blue-500/10">
      <div className="pl-3 text-gray-400">
        <Search className="w-5 h-5" />
      </div>
      <input
        type="text"
        placeholder="Search startups, founders, metrics..."
        className="flex-1 bg-transparent border-none outline-none text-sm h-10 placeholder:text-gray-400 text-gray-900"
      />
      <button
        type="button"
        className="flex items-center gap-1.5 bg-[#e03d26] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-black transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Add startup</span>
      </button>
    </div>
  );
}
