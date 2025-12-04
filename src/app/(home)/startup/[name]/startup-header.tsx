"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, ArrowUp, TrendingUp } from "lucide-react";
import { MetricsGrid } from "./metrics-grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StartupHeaderProps {
  startup: {
    id: string;
    logo: string | null;
    startupName: string | null;
    tagline: string | null;
    description: string | null;
    category: string | null;
    totalUsers?: number | null;
  };
}

interface MetricsData {
  totalUsers: number | null;
  newSignups30d: number | null;
  conversionRate: number | null;
  monthlyGrowthRate: number | null;
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
  if (!name) return "—";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getGrowthTrend = (growthRate: number | null | undefined) => {
  if (growthRate === null || growthRate === undefined) return null;
  if (growthRate > 0) {
    return { icon: ArrowUp, color: "text-red-600", label: "Growing" };
  }
  return null;
};

export function StartupHeader({ startup }: StartupHeaderProps) {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [, setIsLoadingMetrics] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setIsLoadingMetrics(true);
        const response = await fetch(`/api/metrics?connectionId=${startup.id}`);
        const data = await response.json();

        if (response.ok) {
          setMetrics(data.data || data);
        }
      } catch (err) {
        console.error("Error fetching metrics:", err);
      } finally {
        setIsLoadingMetrics(false);
      }
    }

    if (startup.id) {
      fetchMetrics();
    }
  }, [startup.id]);

  const initials = getInitials(startup.startupName || "");
  const growthTrend = getGrowthTrend(metrics?.monthlyGrowthRate);
  const totalUsers = metrics?.totalUsers ?? startup.totalUsers ?? null;
  const newSignups30d = metrics?.newSignups30d ?? null;
  const conversionRate = metrics?.conversionRate ?? null;
  const monthlyGrowthRate = metrics?.monthlyGrowthRate ?? null;

  return (
    <>
      {/* Small screens: Show Card Layout */}
      <div className="md:hidden w-full">
        <div className="relative bg-[#f3f4f6] border border-gray-300 rounded">
          {/* Category Badge */}
          {startup.category && (
            <div className="absolute top-0 left-0 border-b border-r border-gray-300 bg-white px-2 py-1 text-[10px] font-medium text-gray-900 uppercase rounded-tl z-10">
              {startup.category}
            </div>
          )}

          {/* Top Section: Logo, Name, Tagline */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="w-14 h-14 object-cover shrink-0">
                {startup.logo ? (
                  <AvatarImage
                    src={startup.logo}
                    alt={startup.startupName || "Startup logo"}
                  />
                ) : null}
                <AvatarFallback className="text-white bg-black font-bold text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-lg text-gray-900 truncate">
                  {startup.startupName || "—"}
                </h3>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {startup.tagline || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Metrics Grid */}
          <div className="border-t border-gray-300">
            <div className="grid grid-cols-2">
              {/* Top Left: Total Users */}
              <div className="flex flex-col px-3 py-2.5 border-r border-b border-gray-300">
                <span className="text-base font-bold text-gray-900">
                  {formatNumber(totalUsers)}
                </span>
                <span className="text-[10px] text-gray-600 mt-0.5">
                  Total Users
                </span>
              </div>

              {/* Top Right: New Signups */}
              <div className="flex flex-col px-3 py-2.5 border-b border-gray-300">
                <span className="text-base font-bold text-gray-900">
                  {formatNumber(newSignups30d)}
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
                      monthlyGrowthRate !== null &&
                      monthlyGrowthRate !== undefined &&
                      monthlyGrowthRate >= 0
                        ? "text-red-600"
                        : "text-gray-900"
                    }`}
                  >
                    {formatPercentage(monthlyGrowthRate)}
                  </span>
                  {growthTrend && growthTrend.icon === ArrowUp && (
                    <TrendingUp className="w-3 h-3 text-red-600" />
                  )}
                </div>
                <span className="text-[10px] text-gray-600 mt-0.5">Growth</span>
              </div>

              {/* Bottom Right: Conversion */}
              <div className="flex flex-col px-3 py-2.5">
                <span className="text-base font-bold text-gray-900">
                  {formatConversionRate(conversionRate)}
                </span>
                <span className="text-[10px] text-gray-600 mt-0.5">
                  Conversion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medium+ screens: Show full header */}
      <div className="hidden md:flex border-gray-300 w-full">
        {/* Logo, Startup Info and Metrics Grid Container */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Logo and Startup Info Row */}
          <div className="px-4 md:px-6 lg:px-8 mt-8 md:mt-12 flex-1">
            <div className="flex items-start gap-4 md:gap-6">
              {/* Logo */}
              <div className="shrink-0">
                {startup.logo ? (
                  <div className="w-24 h-24 overflow-hidden flex items-center justify-center">
                    <Image
                      src={startup.logo}
                      alt={startup.startupName || "Startup logo"}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center">
                    <Star className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              {/* Startup Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="text-4xl font-mono font-bold text-foreground mb-2">
                    {startup.startupName}
                  </h1>
                  <span className="inline-flex  -mt-2  text-sm font-medium  whitespace-nowrap shrink-0 ">
                    <div className="flex items-center bg-[#e03c26] p-1 justify-center">
                      <Image
                        src="/logo-icon.svg"
                        alt="Verified"
                        width={14}
                        height={14}
                      />
                    </div>
                    <span className="text-[10px] py-0.5 text-center justify-center items-center border border-gray-300 px-1  border-l-0">
                      Verified
                    </span>
                  </span>
                </div>
                {startup.tagline && (
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {startup.tagline}
                  </p>
                )}
                {startup.description && (
                  <p className="text-[12px] font-normal mb-4">
                    {startup.description}
                  </p>
                )}
                {/* Meta Info */}
                <div className="flex flex-wrap items-center mt-4 mb-4">
                  {startup.category && (
                    <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-black text-white">
                      {startup.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300">
            {/* Metrics Grid */}
            <MetricsGrid connectionId={startup.id} />
          </div>
        </div>
      </div>
    </>
  );
}
