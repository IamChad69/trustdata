"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";
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

  return (
    <div className="mt-8">
      <div className="border border-gray-300 overflow-hidden ">
        <Table>
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
