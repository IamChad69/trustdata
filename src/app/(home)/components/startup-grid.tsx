"use client";

import { StartupCard } from "./startup-card";
import type { StartupData } from "./Startup-table";

interface StartupGridProps {
  startups: StartupData[];
}

export function StartupGrid({ startups }: StartupGridProps) {
  if (startups.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No startups found</p>
      </div>
    );
  }

  return (
    <div className="grid mt-4 sm:mt-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 items-stretch">
      {startups.map((startup, index) => (
        <StartupCard key={startup.id || index} startup={startup} />
      ))}
    </div>
  );
}
