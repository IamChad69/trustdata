"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown, ArrowRight, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface StartupData {
  id?: string;
  name: string;
  tagline?: string;
  category?: string;
  founder?: {
    name?: string;
    handle?: string;
    avatar?: string;
  };
  totalUsers?: number | null;
  newSignups30d?: number | null;
  conversionRate?: number | null;
  monthlyGrowthRate?: number | null;
  logo?: string;
  logoColor?: string;
}

interface StartupTableProps {
  startups: StartupData[];
}

const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("en-US").format(value);
};

const formatPercentage = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "—";
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
};

// Get trend indicator for growth rate
// Shows positive trends clearly, neutral for low/negative to avoid making startups look bad
const getGrowthTrend = (growthRate: number | null | undefined) => {
  if (growthRate === null || growthRate === undefined) return null;

  // Strong positive growth (>10%)
  if (growthRate > 10) {
    return {
      icon: ArrowUp,
      color: "text-green-600",
      label: "Strong growth",
    };
  }
  // Positive growth (0-10%)
  if (growthRate > 0) {
    return { icon: ArrowUp, color: "text-green-500", label: "Growing" };
  }
  // Neutral for low/negative (don't show down arrow to avoid negative perception)
  return { icon: ArrowDown, color: "text-gray-400", label: "Stable" };
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getAvatarUrl = (seed: string): string => {
  // Generate SVG avatar from DiceBear (free service)
  const cleanSeed = seed.replace(/^@/, ""); // Remove @ prefix if present
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
    cleanSeed
  )}&size=24`;
};

export const StartupTable = ({ startups }: StartupTableProps) => {
  const router = useRouter();

  const handleRowClick = (startupName: string) => {
    // Use encodeURIComponent to match our routing pattern
    router.push(`/startup/${encodeURIComponent(startupName)}`);
  };

  const formatConversionRate = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return "—";
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="mt-4 sm:mt-8">
      {/* Mobile Card View - Small Screens Only */}
      <div className="md:hidden space-y-3">
        {startups.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-[#f3f4f6] border border-gray-300 rounded">
            No startups found
          </div>
        ) : (
          startups.map((startup, index) => {
            const initials = getInitials(startup.name);
            const growthTrend = getGrowthTrend(startup.monthlyGrowthRate);

            return (
              <div
                key={startup.id || index}
                onClick={() => handleRowClick(startup.name)}
                className="relative bg-[#f3f4f6] border border-gray-300 rounded cursor-pointer hover:bg-gray-200 transition-colors"
              >
                {/* Category Badge */}
                {startup.category && (
                  <div className="absolute top-0 left-0 border-b border-r border-gray-300 bg-white px-2 py-1 text-[10px] font-medium text-gray-900 uppercase rounded-tl">
                    {startup.category}
                  </div>
                )}

                {/* Top Section: Logo, Name, Tagline */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 object-cover shrink-0">
                      {startup.logo ? (
                        <AvatarImage src={startup.logo} alt={startup.name} />
                      ) : null}
                      <AvatarFallback className="text-white bg-black font-bold text-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-lg text-gray-900 truncate">
                        {startup.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {startup.tagline || "—"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Metrics Grid + Visit Button */}
                <div className="relative flex border-t border-gray-300">
                  {/* Metrics Grid - 2x2 */}
                  <div className="flex-[2] grid grid-cols-2 max-w-[calc(100%-80px)]">
                    {/* Top Left: Total Users */}
                    <div className="flex flex-col px-3 py-2.5 border-r border-b border-gray-300">
                      <span className="text-base font-bold text-gray-900">
                        {formatNumber(startup.totalUsers)}
                      </span>
                      <span className="text-[10px] text-gray-600 mt-0.5">
                        Total Users
                      </span>
                    </div>

                    {/* Top Right: New Signups */}
                    <div className="flex flex-col px-3 py-2.5 border-b border-gray-300">
                      <span className="text-base font-bold text-gray-900">
                        {formatNumber(startup.newSignups30d)}
                      </span>
                      <span className="text-[10px] text-gray-600 mt-0.5">
                        New Signups (30d)
                      </span>
                    </div>

                    {/* Bottom Left: Growth */}
                    <div className="flex flex-col px-3 py-2.5 border-r border-gray-300">
                      <div className="flex items-center gap-1">
                        <span
                          className={`text-base font-bold ${
                            startup.monthlyGrowthRate !== null &&
                            startup.monthlyGrowthRate !== undefined &&
                            startup.monthlyGrowthRate >= 0
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {formatPercentage(startup.monthlyGrowthRate)}
                        </span>
                        {growthTrend && growthTrend.icon === ArrowUp && (
                          <TrendingUp className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                      <span className="text-[10px] text-gray-600 mt-0.5">
                        Growth
                      </span>
                    </div>

                    {/* Bottom Right: Conversion */}
                    <div className="flex flex-col px-3 py-2.5">
                      <span className="text-base font-bold text-gray-900">
                        {formatConversionRate(startup.conversionRate)}
                      </span>
                      <span className="text-[10px] text-gray-600 mt-0.5">
                        Conversion
                      </span>
                    </div>
                  </div>

                  {/* Visit Button - Vertical */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(startup.name);
                    }}
                    className="flex flex-col items-center justify-center w-20 shrink-0 bg-black text-white hover:bg-gray-800 transition-colors py-2"
                  >
                    <ArrowRight className="w-5 h-5 mb-2" />
                    <span
                      className="text-[11px] font-bold uppercase"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      Visit
                    </span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table View - Medium Screens and Up */}
      <div className="hidden md:block border border-gray-300 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow className="border-b border-gray-300 bg-[#f3f4f6] hover:bg-[#f3f4f6]">
              <TableHead className="bg-transparent  uppercase text-[12px]">
                Rank
              </TableHead>
              <TableHead className="bg-transparent uppercase text-[12px]">
                Startup Name
              </TableHead>
              <TableHead className="bg-transparent uppercase text-[12px]">
                Founder
              </TableHead>
              <TableHead className="bg-transparent uppercase text-[12px] text-center">
                Total Users
              </TableHead>
              <TableHead className="bg-transparent uppercase text-[12px] text-center">
                New Users (30d)
              </TableHead>
              <TableHead className="bg-transparent text-[12px] text-center">
                MoM Growth
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {startups.length === 0 ? (
              <TableRow className="bg-[#f3f4f6]">
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground bg-white"
                >
                  No startups found
                </TableCell>
              </TableRow>
            ) : (
              startups.map((startup, index) => {
                const rank = index + 1;
                const initials = getInitials(startup.name);

                const founderHandle =
                  startup.founder?.handle || startup.founder?.name;

                return (
                  <TableRow
                    key={startup.id || index}
                    onClick={() => handleRowClick(startup.name)}
                    className="group cursor-pointer bg-[#f3f4f6] border-b border-gray-300 hover:bg-gray-200 transition-colors"
                  >
                    <TableCell className="bg-[#f3f4f6] group-hover:bg-gray-200 py-4">
                      <span className="text-[12px] px-1 text-muted-foreground font-medium">
                        #{rank}
                      </span>
                    </TableCell>
                    <TableCell className="p-2 py-4 bg-[#f3f4f6] group-hover:bg-gray-200 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] w-[30%] ">
                      <div className="flex items-center gap-3 ">
                        <Avatar className=" w-8 h-8 object-cover shrink-0 rounded-none">
                          {startup.logo ? (
                            <AvatarImage
                              src={startup.logo}
                              alt={startup.name}
                            />
                          ) : null}
                          <AvatarFallback className="text-white bg-black rounded-none font-bold text-lg">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex flex-col flex-1">
                          <span className="font-medium truncate max-w-[130px] md:max-w-[250px]">
                            {startup.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate max-w-[130px] md:max-w-[250px]">
                            {startup.tagline ? startup.tagline : "--"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="bg-[#f3f4f6] group-hover:bg-gray-200 py-4">
                      {startup.founder && founderHandle ? (
                        <div className="flex items-center gap-2">
                          <Avatar className=" w-6 h-6 object-cover shrink-0 bg-[#f3f4f6]">
                            <AvatarImage
                              src={getAvatarUrl(founderHandle)}
                              alt={founderHandle}
                            />
                            <AvatarFallback>
                              {getInitials(founderHandle)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">
                            {founderHandle.startsWith("@")
                              ? founderHandle
                              : `@${founderHandle}`}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="bg-[#f3f4f6] group-hover:bg-gray-200 text-center py-4">
                      <span className="text-sm">
                        {formatNumber(startup.totalUsers)}
                      </span>
                    </TableCell>
                    <TableCell className="bg-[#f3f4f6] group-hover:bg-gray-200 text-center py-4">
                      <span className="text-sm">
                        {formatNumber(startup.newSignups30d)}
                      </span>
                    </TableCell>
                    <TableCell className="bg-[#f3f4f6] group-hover:bg-gray-200 text-center py-4">
                      {startup.monthlyGrowthRate !== null &&
                      startup.monthlyGrowthRate !== undefined ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <span
                            className={`${
                              startup.monthlyGrowthRate >= 0 ? "" : ""
                            }`}
                          >
                            {formatPercentage(startup.monthlyGrowthRate)}
                          </span>
                          {(() => {
                            const trend = getGrowthTrend(
                              startup.monthlyGrowthRate
                            );
                            if (!trend) return null;
                            const Icon = trend.icon;
                            return (
                              <Icon
                                className={`w-4 h-4 ${trend.color}`}
                                aria-label={trend.label}
                              />
                            );
                          })()}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="text-muted-foreground">—</span>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
