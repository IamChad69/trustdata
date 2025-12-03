"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Category =
  | "all"
  | "saas"
  | "dev-tools"
  | "productivity"
  | "design-tools";

interface CategoryFilterProps {
  category: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "saas", label: "SaaS" },
  { value: "dev-tools", label: "Dev Tools" },
  { value: "productivity", label: "Productivity" },
  { value: "design-tools", label: "Design Tools" },
];

export function CategoryFilter({
  category,
  onCategoryChange,
}: CategoryFilterProps) {
  const selectedCategory = categories.find((cat) => cat.value === category);

  return (
    <>
      {/* Dropdown for small screens */}
      <div className="md:hidden">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[140px] rounded-none shadow-none border-gray-300 [&_svg]:text-black [&_svg]:opacity-100">
            <SelectValue placeholder="Select category">
              {selectedCategory?.label || "All"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-none shadow-none border-gray-300">
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Button group for medium screens and up */}
      <div className="hidden md:inline-flex items-center rounded-none gap-1">
        {categories.map((cat) => {
          const isActive = category === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={cn(
                "px-4 py-2 text-[12px] font-medium transition-all duration-200 rounded-none",
                isActive
                  ? "bg-black text-white"
                  : " text-gray-700 border rounded-none border-gray-300 hover:bg-gray-100"
              )}
              aria-label={`Filter by ${cat.label}`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </>
  );
}
