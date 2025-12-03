"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "table";

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex items-center gap-1">
      <button
        onClick={() => onViewChange("grid")}
        className={cn(
          "p-2 transition-all duration-200 rounded-none",
          view === "grid"
            ? "bg-black text-white"
            : " text-gray-700 border border-gray-300 hover:bg-gray-100"
        )}
        aria-label="Grid view"
      >
        <LayoutGrid
          fill={view === "grid" ? "currentColor" : "none"}
          className={cn(
            "w-5 h-5 transition-colors",
            view === "grid" ? "text-white" : "text-gray-700"
          )}
        />
      </button>
      <button
        onClick={() => onViewChange("table")}
        className={cn(
          "p-2 transition-all duration-200 rounded-none",
          view === "table"
            ? "bg-black text-white"
            : " text-gray-700 border border-gray-300 hover:bg-gray-100"
        )}
        aria-label="Table view"
      >
        <List
          className={cn(
            "w-5 h-5 transition-colors",
            view === "table" ? "text-white" : "text-gray-700"
          )}
        />
      </button>
    </div>
  );
}
