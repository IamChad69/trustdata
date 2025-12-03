"use client";

import { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { format, parseISO } from "date-fns";
import type { TimeRange } from "@/lib/db/queries/getUserGrowthData";

interface GrowthDataPoint {
  date: string;
  users: number;
}

interface NewUsersDataPoint {
  date: string;
  newUsers: number;
}

interface MetricGraphProps {
  connectionId: string;
}

const chartConfig = {
  users: {
    label: "Users",
    color: "oklch(0.21 0.0059 285.89)", // Dark gray/black matching UI foreground
  },
  newUsers: {
    label: "New Users",
    color: "oklch(0.4 0.01 285)", // Medium gray matching UI muted tones
  },
};

const timeRangeOptions: { value: TimeRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "all", label: "All time" },
];

type ViewType = "growth" | "newUsers";

const viewTypeOptions: { value: ViewType; label: string }[] = [
  { value: "growth", label: "Growth" },
  { value: "newUsers", label: "New Users" },
];

export function MetricGraph({ connectionId }: MetricGraphProps) {
  const [viewType, setViewType] = useState<ViewType>("growth");
  const [growthData, setGrowthData] = useState<GrowthDataPoint[]>([]);
  const [newUsersData, setNewUsersData] = useState<NewUsersDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>("all");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch growth and new users data
        const [growthResponse, newUsersResponse] = await Promise.all([
          fetch(
            `/api/growth-data?connectionId=${connectionId}&timeRange=${timeRange}`
          ),
          fetch(
            `/api/new-users-data?connectionId=${connectionId}&timeRange=${timeRange}`
          ),
        ]);

        const growthResult = await growthResponse.json();
        const newUsersResult = await newUsersResponse.json();

        if (!growthResponse.ok) {
          throw new Error(
            growthResult.message || "Failed to fetch growth data"
          );
        }

        if (!newUsersResponse.ok) {
          throw new Error(
            newUsersResult.message || "Failed to fetch new users data"
          );
        }

        // safeHandler wraps response as { success: true, data: ... }
        const growth = growthResult.data || growthResult || [];
        const newUsers = newUsersResult.data || newUsersResult || [];

        setGrowthData(Array.isArray(growth) ? growth : []);
        setNewUsersData(Array.isArray(newUsers) ? newUsers : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    }

    if (connectionId) {
      fetchData();
    }
  }, [connectionId, timeRange]);

  // Get data based on view type
  const data = viewType === "growth" ? growthData : newUsersData;
  const dataKey = viewType === "growth" ? "users" : "newUsers";
  const title = viewType === "growth" ? "Growth" : "New Users";

  if (isLoading) {
    return (
      <div className="bg-[#f6f6f6] border border-gray-300 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <div className="h-[400px] flex items-center justify-center">
          <div className="text-sm text-muted-foreground">Loading chart...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f6f6f6] border border-gray-300 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <div className="text-sm text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-[#f6f6f6] border border-gray-300 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        </div>
        <div className="h-[350px] flex items-center justify-center">
          <div className="text-sm text-muted-foreground">
            No {viewType === "growth" ? "growth" : "new users"} data available
          </div>
        </div>
      </div>
    );
  }

  // Format data for chart
  const chartData = data.map((point) => {
    const date = parseISO(point.date + "T00:00:00");
    const value =
      viewType === "growth"
        ? (point as GrowthDataPoint).users
        : (point as NewUsersDataPoint).newUsers;

    return {
      date: point.date,
      [dataKey]: value,
      // Format date for display
      displayDate:
        timeRange === "all"
          ? format(date, "MMM yyyy") // Show month and year for all time
          : format(date, "MMM d"),
    };
  });

  // Calculate date range for display
  const startDate = data[0]?.date
    ? format(parseISO(data[0].date + "T00:00:00"), "MMM d, yyyy")
    : "";
  const endDate = data[data.length - 1]?.date
    ? format(parseISO(data[data.length - 1].date + "T00:00:00"), "MMM d, yyyy")
    : "";

  // Calculate 8 evenly spaced tick indices for "all time" and "30d" views
  const getTickIndices = () => {
    if (
      (timeRange !== "all" && timeRange !== "30d") ||
      chartData.length === 0
    ) {
      return null;
    }
    const totalPoints = chartData.length;
    if (totalPoints <= 8) {
      return Array.from({ length: totalPoints }, (_, i) => i);
    }
    // Calculate 8 evenly spaced indices (including first and last)
    const indices: number[] = [0]; // Always include first
    const step = (totalPoints - 1) / 8; // Divide into 8 segments for 9 total ticks
    for (let i = 1; i < 8; i++) {
      indices.push(Math.round(step * i));
    }
    indices.push(totalPoints - 1); // Always include last
    return indices;
  };

  const tickIndices = getTickIndices();

  // For "all time" and "30d", ensure unique labels by filtering duplicates
  const getUniqueTicks = () => {
    if (!tickIndices || (timeRange !== "all" && timeRange !== "30d")) {
      return undefined;
    }
    const tickValues = tickIndices
      .map((idx) => chartData[idx]?.displayDate)
      .filter(Boolean);
    // Remove duplicates while preserving order
    const uniqueTicks: string[] = [];
    const seen = new Set<string>();
    for (const tick of tickValues) {
      if (!seen.has(tick)) {
        seen.add(tick);
        uniqueTicks.push(tick);
      }
    }
    return uniqueTicks.length > 0 ? uniqueTicks : undefined;
  };

  return (
    <div className="bg-[#f6f6f6] border border-gray-300 ">
      <div className="flex items-center justify-between p-6 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          {startDate && endDate && (
            <p className="text-[10px] text-muted-foreground">
              {startDate} - {endDate}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={viewType}
            onValueChange={(value) => setViewType(value as ViewType)}
          >
            <SelectTrigger className=" border-border text-[12px] shadow-none rounded-none ring-0">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {viewTypeOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="rounded-none text-[10px]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={timeRange}
            onValueChange={(value) => setTimeRange(value as TimeRange)}
          >
            <SelectTrigger className=" border-border text-[12px] shadow-none rounded-none ring-0">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="rounded-none">
              {timeRangeOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="rounded-none text-[10px]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="px-6 py-2 -ml-8">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id={`fill${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={`var(--color-${dataKey})`}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${dataKey})`}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="displayDate"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              ticks={getUniqueTicks()}
              domain={["dataMin", "dataMax"]}
              tickFormatter={(value) => {
                const point = chartData.find((d) => d.displayDate === value);
                if (!point) return value;
                const date = parseISO(point.date + "T00:00:00");
                if (timeRange === "all") {
                  return format(date, "MMM yyyy");
                }
                return format(date, "MMM d");
              }}
              interval={
                timeRange === "all" || timeRange === "30d"
                  ? undefined
                  : "preserveStartEnd"
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(1)}k`;
                }
                return value.toString();
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => {
                    const point = chartData.find(
                      (d) => d.displayDate === value
                    );
                    if (point) {
                      const date = parseISO(point.date + "T00:00:00");
                      return format(date, "MMM d, yyyy");
                    }
                    return value;
                  }}
                />
              }
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={`var(--color-${dataKey})`}
              fill={`url(#fill${dataKey})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </div>
      
    </div>
  );
}
