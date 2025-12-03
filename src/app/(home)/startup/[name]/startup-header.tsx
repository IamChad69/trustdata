"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";  
import { MetricsGrid } from "./metrics-grid";
import { StartupCard } from "../../components/startup-card";
import type { StartupData } from "../../components/Startup-table";

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
}

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

  // Transform startup data to StartupData format for StartupCard
  const startupCardData: StartupData = {
    id: startup.id,
    name: startup.startupName || "",
    tagline: startup.tagline || undefined,
    category: startup.category || undefined,
    logo: startup.logo || undefined,
    totalUsers: metrics?.totalUsers ?? startup.totalUsers ?? null,
  };

  return (
    <>
      {/* Small screens: Show StartupCard */}
      <div className="md:hidden w-full">
        <StartupCard startup={startupCardData} disableNavigation />
      </div>

      {/* Medium+ screens: Show full header */}
      <div className="hidden md:flex border-gray-300 w-full">
        {/* Logo, Startup Info and Metrics Grid Container */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Logo and Startup Info Row */}
          <div className="px-4 mt-12 flex-1">
            <div className="flex items-start gap-6">
              {/* Logo */}
              <div className="shrink-0 px-4 sm:px-6 md:px-8">
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
