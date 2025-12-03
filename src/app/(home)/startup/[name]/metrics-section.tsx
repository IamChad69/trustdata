"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, DollarSign, UserPlus, Percent } from "lucide-react";

interface MetricsData {
  totalUsers: number | null;
  paidUsers: number | null;
  newSignups30d: number;
  conversionRate: number | null; // Percentage of paid users out of total users
  monthlyGrowthRate: number | null;
}

interface MetricsSectionProps {
  connectionId: string;
}

export function MetricsSection({ connectionId }: MetricsSectionProps) {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `/api/metrics?connectionId=${connectionId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch metrics");
        }

        setMetrics(data.data || data);
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setError(err instanceof Error ? err.message : "Failed to load metrics");
      } finally {
        setIsLoading(false);
      }
    }

    if (connectionId) {
      fetchMetrics();
    }
  }, [connectionId]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 bg-muted/50 rounded-lg animate-pulse">
              <div className="h-4 bg-muted rounded w-20 mb-2"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Metrics</h2>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return null;
  }

  const hasAnyMetrics =
    (metrics.totalUsers !== null && metrics.totalUsers !== undefined) ||
    (metrics.paidUsers !== null && metrics.paidUsers !== undefined) ||
    (metrics.newSignups30d !== undefined && metrics.newSignups30d !== null) ||
    (metrics.conversionRate !== null &&
      metrics.conversionRate !== undefined &&
      !isNaN(metrics.conversionRate)) ||
    (metrics.monthlyGrowthRate !== null &&
      metrics.monthlyGrowthRate !== undefined &&
      !isNaN(metrics.monthlyGrowthRate));

  if (!hasAnyMetrics) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Metrics</h2>
        <p className="text-sm text-muted-foreground">
          No metrics available. Make sure your database has a users table.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Total Users - Always show if available */}
        {metrics.totalUsers !== null ? (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {metrics.totalUsers.toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground/50">Total Users</p>
            </div>
            <p className="text-sm text-muted-foreground/50">N/A</p>
          </div>
        )}

        {/* Paid Users - Always show if available */}
        {metrics.paidUsers !== null ? (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Paid Users</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {metrics.paidUsers.toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground/50">Paid Users</p>
            </div>
            <p className="text-sm text-muted-foreground/50">N/A</p>
          </div>
        )}

        {/* New Signups (30d) - Always show */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">New Signups (30d)</p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {(metrics.newSignups30d ?? 0).toLocaleString()}
          </p>
        </div>

        {/* Conversion Rate - Show if available */}
        {metrics.conversionRate !== null &&
        metrics.conversionRate !== undefined &&
        !isNaN(metrics.conversionRate) ? (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {metrics.conversionRate.toFixed(2)}%
            </p>
          </div>
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-4 h-4 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground/50">
                Conversion Rate
              </p>
            </div>
            <p className="text-sm text-muted-foreground/50">N/A</p>
          </div>
        )}

        {/* Monthly Growth Rate - Always show if available */}
        {metrics.monthlyGrowthRate !== null &&
        metrics.monthlyGrowthRate !== undefined &&
        !isNaN(metrics.monthlyGrowthRate) ? (
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Monthly Growth</p>
            </div>
            <p
              className={`text-2xl font-bold ${
                metrics.monthlyGrowthRate >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {metrics.monthlyGrowthRate >= 0 ? "+" : ""}
              {metrics.monthlyGrowthRate.toFixed(1)}%
            </p>
          </div>
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground/50">Monthly Growth</p>
            </div>
            <p className="text-sm text-muted-foreground/50">N/A</p>
          </div>
        )}
      </div>
    </div>
  );
}
