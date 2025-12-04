"use client";

import Link from "next/link";
import { TrendingUp, Minus, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { StartupData } from "./Startup-table";

interface StartupCardProps {
  startup: StartupData;
  disableNavigation?: boolean;
}

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US").format(value);
};

const formatPercentage = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "—";
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
};

const formatConversionRate = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "—";
  return `${value.toFixed(2)}%`;
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getGrowthTrend = (growthRate: number | null | undefined) => {
  if (growthRate === null || growthRate === undefined) return null;

  if (growthRate > 10) {
    return {
      icon: TrendingUp,
      color: "text-[#e03d26]",
      label: "Strong growth",
    };
  }
  if (growthRate > 0) {
    return { icon: TrendingUp, color: "text-[#e03d26]", label: "Growing" };
  }
  return { icon: Minus, color: "text-gray-400", label: "Stable" };
};

export function StartupCard({
  startup,
  disableNavigation = false,
}: StartupCardProps) {
  const initials = getInitials(startup.name);
  const growthTrend = getGrowthTrend(startup.monthlyGrowthRate);
  const startupLink = `/startup/${encodeURIComponent(startup.name)}`;

  return (
    <div className="w-full h-full text-left border border-gray-300 bg-[#f6f6f6] flex flex-col cursor-default relative">
      {startup.category && (
        <div className="absolute top-0 left-0 border-b border-r border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-900">
          {startup.category}
        </div>
      )}
      {/* Header Section */}
      <div className="p-6 pb-4 flex-1 flex items-center justify-center min-h-[140px] md:min-h-[180px]">
        <div className="flex items-center justify-start gap-4 w-full">
          <Avatar className="size-16 object-cover shrink-0 ">
            {startup.logo ? (
              <AvatarImage src={startup.logo} alt={startup.name} />
            ) : null}
            <AvatarFallback className="text-white font-bold text-xl bg-gray-400">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="text-left min-w-0">
            <h3 className="font-bold font-mono text-lg truncate w-full">
              {startup.name}
            </h3>
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {startup.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid Section */}
      <div className="relative flex-shrink-0">
        {/* All screens: 2x2 grid layout */}
        <div
          className={`grid border-t border-gray-300 ${
            disableNavigation ? "grid-cols-2" : "grid-cols-[1fr_1fr_80px]"
          }`}
        >
          {/* Top Left */}
          <div className="flex flex-col px-6 py-3 border-r border-b border-gray-300 min-w-0">
            <span className="text-base font-bold truncate">
              {formatNumber(startup.totalUsers)}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Total Users
            </span>
          </div>
          {/* Top Right */}
          <div className="flex flex-col px-6 py-3 border-b border-gray-300 min-w-0">
            <span className="text-base font-bold truncate">
              {formatNumber(startup.newSignups30d)}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              New Signups (30d)
            </span>
          </div>
          {/* Bottom Left */}
          <div className="flex flex-col px-6 py-3 border-r border-gray-300 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className={`text-base font-bold truncate ${
                  startup.monthlyGrowthRate !== null &&
                  startup.monthlyGrowthRate !== undefined &&
                  startup.monthlyGrowthRate >= 0
                    ? "text-[#e03d26]"
                    : "text-gray-500"
                }`}
              >
                {formatPercentage(startup.monthlyGrowthRate)}
              </span>
              {growthTrend && (
                <growthTrend.icon
                  className={`w-3.5 h-3.5 shrink-0 ${growthTrend.color}`}
                  aria-label={growthTrend.label}
                />
              )}
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Growth
            </span>
          </div>
          {/* Bottom Right */}
          <div className="flex flex-col px-6 py-3 min-w-0">
            <span className="text-base font-bold truncate">
              {formatConversionRate(startup.conversionRate)}
            </span>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Conversion
            </span>
          </div>
          {/* Navigation Arrow - spans full height of bottom two cells */}
          {!disableNavigation && (
            <Link
              href={startupLink}
              className="col-start-3 row-start-1 row-span-2 flex flex-col items-center justify-center w-20 shrink-0 border-l border-gray-300 bg-black text-white hover:bg-[#e03d26] transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
              <span className="text-xs font-bold mt-1 hidden md:block">
                Visit
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
