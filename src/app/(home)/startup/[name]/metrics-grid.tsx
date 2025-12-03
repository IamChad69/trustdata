"use client";

import { useEffect, useState } from "react";

function useScramblingText(interval = 100) {
  const [text, setText] = useState("•••");

  useEffect(() => {
    const chars = "0123456789+-%";
    const intervalId = setInterval(() => {
      const length = Math.floor(Math.random() * 3) + 2;
      let scrambled = "";
      for (let i = 0; i < length; i++) {
        scrambled += chars[Math.floor(Math.random() * chars.length)];
      }
      setText(scrambled);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return text;
}

interface MetricsData {
  totalUsers: number | null;
  paidUsers: number | null;
  newSignups30d: number;
  conversionRate: number | null;
  monthlyGrowthRate: number | null;
  growthRate: number | null;
}

interface MetricsGridProps {
  connectionId: string;
}

function ScramblingValue() {
  const scramblingText = useScramblingText(150);
  return <span>{scramblingText}</span>;
}

export function MetricsGrid({ connectionId }: MetricsGridProps) {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/metrics?connectionId=${connectionId}`
        );
        const data = await response.json();

        if (response.ok) {
          setMetrics(data.data || data);
        }
      } catch (err) {
        console.error("Error fetching metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (connectionId) {
      fetchMetrics();
    }
  }, [connectionId]);

  const metricsItems = [
    {
      label: "Monthly Growth",
    },
    {
      label: "Conversion Rate",
    },
    {
      label: "New Signups (30d)",
    },
   
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 relative corner-brackets h-16">
        {metricsItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col border-r last:border-r-0 items-center justify-center h-16 box-border border-gray-300"
          >
            <p className="text-md md:text-lg font-bold text-foreground mb-1">
              <ScramblingValue />
            </p>
            <p className="text-[10px] text-muted-foreground">{item.label}</p>
          </div>
        ))}{" "}
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  const formatPercentage = (num: number | null): string => {
    if (num === null || num === undefined || isNaN(num)) return "0%";
    return `${num >= 0 ? "+" : ""}${num.toFixed(0)}%`;
  };

  const metricsItemsWithValues = [
    {
      value: formatPercentage(metrics.monthlyGrowthRate),
      label: "Monthly Growth",
    },
    {
      value: formatPercentage(metrics.conversionRate),
      label: "Conversion Rate",
    },
    {
      value: `${metrics.newSignups30d}+`,
      label: "New Signups (30d)",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 relative corner-brackets h-16">
      {metricsItemsWithValues.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-center justify-center h-16 box-border border-gray-300 ${
            index < metricsItemsWithValues.length - 1 ? "border-r" : ""
          }`}
        >
          <p className="text-md md:text-lg font-bold text-foreground mb-1 ">
            {item.value}
          </p>
          <p className="text-[10px] text-muted-foreground ">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
