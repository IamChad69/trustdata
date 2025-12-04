"use client";

import { useEffect, useState, useMemo } from "react";
import { SearchSection } from "@/app/(home)/components/search";
import { SiteHeader } from "./components/site-header";
import { StartupTable, type StartupData } from "./components/Startup-table";
import { StartupGrid } from "./components/startup-grid";
import { ViewToggle } from "./components/view-toggle";
import { CategoryFilter, type Category } from "./components/category-filter";
import { Megaphone } from "lucide-react";

type ViewMode = "grid" | "table";

// Helper function to normalize category values for filtering
const normalizeCategory = (category: string | undefined): string => {
  if (!category) return "";
  return category.toLowerCase().replace(/\s+/g, "-");
};

export default function Home() {
  const [startups, setStartups] = useState<StartupData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("table");
  const [category, setCategory] = useState<Category>("all");

  useEffect(() => {
    async function fetchStartups() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/startups");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch startups");
        }

        setStartups(data.data?.startups || data.startups || []);
      } catch (err) {
        console.error("Error fetching startups:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load startups"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchStartups();
  }, []);

  // Filter startups based on selected category
  const filteredStartups = useMemo(() => {
    if (category === "all") {
      return startups;
    }

    return startups.filter((startup) => {
      const normalizedStartupCategory = normalizeCategory(startup.category);
      const normalizedFilterCategory = category.toLowerCase();

      // Handle special cases for category matching
      if (normalizedFilterCategory === "dev-tools") {
        return (
          normalizedStartupCategory === "dev-tools" ||
          normalizedStartupCategory === "devtools" ||
          normalizedStartupCategory === "developer-tools"
        );
      }

      if (normalizedFilterCategory === "design-tools") {
        return (
          normalizedStartupCategory === "design-tools" ||
          normalizedStartupCategory === "designtools"
        );
      }

      return normalizedStartupCategory === normalizedFilterCategory;
    });
  }, [startups, category]);

  return (
    <main className="min-h-screen">
      <div className="relative z-10 mx-auto pt-4 sm:pt-8 pb-12 sm:pb-24">
        <SiteHeader />
        <div className="mt-4 sm:mt-8 flex flex-col items-center justify-center text-center space-y-4 sm:space-y-8 mb-6 sm:mb-15">
          <p className="font-roboto-mono font-bold text-2xl sm:text-3xl md:text-5xl mb-4 sm:mb-6 md:mb-12 tracking-tighter px-4">
            Not all great startups <br className="hidden md:block" />
            have MRR —{" "}
            <span className="italic font-shadows-into-light font-light">
              and that&apos;s okay.
            </span>
          </p>
          <p className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs -mt-4 sm:-mt-2 text-muted-foreground px-4">
            <span>Turn curiosity into leads.</span>
            <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>
              Claim your spot for{" "}
              <span className="font-bold text-[#e03d26]">$1.99</span>.
              That&apos;s less than a coffee.
            </span>
          </p>
          <div className="w-full max-w-lg px-4">
            <SearchSection />
          </div>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mx-auto max-w-7xl gap-3 sm:gap-4 px-4 sm:px-6">
          <CategoryFilter category={category} onCategoryChange={setCategory} />
          <div className="hidden md:flex justify-end">
            <ViewToggle view={view} onViewChange={setView} />
          </div>
        </div>

        {/* Startups Display */}
        <div className="mx-auto px-4 sm:px-6 max-w-7xl">
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading startups...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : view === "grid" ? (
            <StartupGrid startups={filteredStartups} />
          ) : (
            <StartupTable startups={filteredStartups} />
          )}
        </div>
      </div>
    </main>
  );
}
