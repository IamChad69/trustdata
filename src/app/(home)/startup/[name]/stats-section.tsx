"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp, PenTool, Share2, Check } from "lucide-react";
import { StartupModal } from "@/app/(home)/components/startup-modal";
import { EmbedBadgeModal } from "@/app/(home)/components/embed-badge-modal";

interface StatsSectionProps {
  totalUsers: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  founderHandle: string | null;
  startupId: string;
  startupName: string;
  slug?: string | null;
  logo?: string | null;
  revenue?: number | null;
}

const formatMonthYear = (date: Date): string => {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  return `${month} ${day}`;
};

export function StatsSection({
  totalUsers,
  createdAt,
  updatedAt,
  founderHandle,
  startupId,
  startupName,
  slug,
}: StatsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmbedModalOpen, setIsEmbedModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [newUsers, setNewUsers] = useState<number | null>(null);
  const [growth, setGrowth] = useState<number | null>(null);
  const [isLoadingNewUsers, setIsLoadingNewUsers] = useState(true);

  const handleShare = async () => {
    const url = `${window.location.origin}/startup/${encodeURIComponent(
      startupName
    )}`;
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  // Fetch new users count (30 days) and growth
  useEffect(() => {
    async function fetchMetrics() {
      try {
        setIsLoadingNewUsers(true);
        const response = await fetch(`/api/metrics?connectionId=${startupId}`);
        const data = await response.json();

        if (response.ok) {
          const metrics = data.data || data;
          setNewUsers(metrics.newSignups30d ?? null);
          setGrowth(metrics.monthlyGrowthRate ?? metrics.growthRate ?? null);
        } else {
          console.error("Failed to fetch metrics:", data.message);
          setNewUsers(null);
          setGrowth(null);
        }
      } catch (err) {
        console.error("Error fetching metrics:", err);
        setNewUsers(null);
        setGrowth(null);
      } finally {
        setIsLoadingNewUsers(false);
      }
    }

    if (startupId) {
      fetchMetrics();
    }
  }, [startupId]);

  return (
    <>
      <div className="hidden sm:flex w-full sm:w-[60%] h-full self-stretch">
        <div className="flex-1 flex flex-col">
          {/* Unified Grid Container */}
          <div className="grid grid-cols-2 grid-rows-[48px_1fr_64px] flex-1 border-l border-r border-gray-300">
            {/* Top Row - Left Column (Two Buttons) */}
            <div className="grid grid-cols-1 border-r border-b border-gray-300">
              {/* <button
                onClick={() => setIsEmbedModalOpen(true)}
                className="flex items-center justify-center border-r border-gray-300 gap-2 px-2 py-2 text-foreground hover:bg-gray-50 transition-colors text-sm font-medium"
                aria-label="Embed code"
              >
                <Code className="w-3 h-3" />
              </button> */}
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-2 py-2 text-foreground hover:bg-gray-50 transition-colors text-sm font-medium"
                aria-label="Share"
              >
                {isCopied ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Share2 className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* Top Row - Right Column (Edit Button) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 px-2 py-2 text-foreground hover:bg-gray-50 transition-colors text-sm font-medium border-b border-gray-300"
            >
              <PenTool className="w-3 h-3" />
              <span>Edit</span>
            </button>

            {/* Middle Row - Left Column (Total Users) */}
            <div className="py-10  bg-[#f6f6f6] border-r  border-b border-gray-300 px-6 justify-center flex flex-col relative  corner-brackets">
              <p className="text-xs font-medium text-muted-foreground mb-6">
                Total Users
              </p>
              <p className="text-3xl font-bold text-foreground mb-6">
                {totalUsers || 0}
              </p>
              <p className="text-xs text-muted-foreground mb-1">Updated</p>
              <p className="text-xs font-semibold text-foreground">
                {createdAt ? formatMonthYear(new Date(createdAt)) : "N/A"}
              </p>
            </div>

            {/* Middle Row - Right Column (New Users) */}
            <div className="px-6 border-b border-r-0 border-gray-300 flex flex-col py-10">
              <p className="text-xs font-medium text-muted-foreground mb-6">
                New Users
              </p>
              <p className="text-3xl font-bold text-foreground mb-6">
                {isLoadingNewUsers ? "—" : newUsers ?? 0}
              </p>
              <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
              <p className="text-xs font-semibold text-foreground">
                {updatedAt ? formatMonthYear(new Date(updatedAt)) : "N/A"}
              </p>
            </div>

            {/* Bottom Row - Left Column (X Logo) */}
            {founderHandle ? (
              <a
                href={`https://x.com/${founderHandle.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-16 box-border border-r border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label={`Visit ${founderHandle}'s X profile`}
              >
                <Image src="/X.png" alt="X" width={24} height={24} />
              </a>
            ) : (
              <div className="flex items-center justify-center h-16  border-r border-gray-300">
                <Image src="/X.png" alt="X" width={24} height={24} />
              </div>
            )}

            {/* Bottom Row - Right Column (Visit Button) */}
            <Link
              href={`/startup/${startupId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 h-16  bg-black text-white hover:bg-[#e03c26] transition-colors cursor-pointer"
              aria-label="View more metrics"
            >
              Visit <ArrowUp className="w-6 h-6 rotate-45 text-white" />
            </Link>
          </div>
        </div>
      </div>
      <StartupModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialStep={2}
        editingStartupId={startupId}
        editingStartupName={startupName}
      />
      <EmbedBadgeModal
        open={isEmbedModalOpen}
        onOpenChange={setIsEmbedModalOpen}
        startupName={startupName}
        startupSlug={slug}
        users={totalUsers}
        growth={growth}
      />
    </>
  );
}
