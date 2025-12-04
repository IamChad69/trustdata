"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Check, ArrowUp, ArrowDown } from "lucide-react";
import { getClientBaseUrl } from "@/utils/env";

interface EmbedBadgeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupName: string;
  startupSlug?: string | null;
  users?: number | null;
  growth?: number | null;
}

const formatUsers = (users: number | null | undefined): string => {
  if (users === null || users === undefined) return "0";
  return users.toString();
};

const formatGrowth = (growth: number | null | undefined): string => {
  if (growth === null || growth === undefined) return "0%";
  return `${growth > 0 ? "+" : ""}${growth.toFixed(1)}%`;
};

export function EmbedBadgeModal({
  open,
  onOpenChange,
  startupName,
  startupSlug,
  users = null,
  growth = null,
}: EmbedBadgeModalProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState<string>("");

  useEffect(() => {
    // Set base URL on client side
    setBaseUrl(getClientBaseUrl());
  }, []);

  const slug =
    startupSlug || startupName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Use useMemo to compute embed code when baseUrl or slug changes
  const embedCode = useMemo(() => {
    if (!baseUrl) {
      return "";
    }

    const embedUrl = `${baseUrl}/api/embed/${slug}?format=svg`;
    const startupUrl = `${baseUrl}/startup/${encodeURIComponent(startupName)}`;
    return `<a href="${startupUrl}" target="_blank"><img src="${embedUrl}" alt="TrustdB verified revenue badge" width="220" height="90" /></a>`;
  }, [baseUrl, slug, startupName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy embed code:", err);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#e4e4e4] sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-sm mt-4 font-mono text-foreground mb-2">
            Embed your verified users badge
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Add this badge to your website to show your verified users to
            visitors.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Preview Section */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">
              Preview:
            </label>
            <div className="border border-gray-300 bg-[#f6f6f6] p-4 flex items-center justify-center">
              <div className="w-[320px] bg-white border border-gray-300 rounded-md flex items-center gap-3 shadow-sm ">
                {/* Logo/Icon */}
                <div className=" h-12 w-12 p-0.5 bg-[#e03d26] rounded-l-sm flex items-center justify-center shrink-0">
                  <Image
                    src={"/logo-icon.svg"}
                    alt={startupName}
                    width={100}
                    height={100}
                    className="p-2 object-fill "
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 ">
                    {growth !== null && growth !== undefined && (
                      <div className="flex items-center gap-2">
                        {growth > 0 ? (
                          <ArrowUp className="w-5 h-5 text-green-600" />
                        ) : growth < 0 ? (
                          <ArrowDown className="w-5 h-5 text-red-600" />
                        ) : null}
                        <p
                          className={`text-[20px] font-bold ${
                            growth > 0
                              ? "text-green-600"
                              : growth < 0
                              ? "text-red-600"
                              : "text-muted-foreground"
                          }`}
                        >
                          {formatGrowth(growth)}
                        </p>
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-medium text-muted-foreground tracking-wide">
                    based on
                    <span className="font-bold">
                      {" "}
                      {formatUsers(users)}
                    </span>{" "}
                    verified users
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Embed Code Section */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-foreground">
              Embed code:
            </label>
            <div className="relative border border-gray-300 bg-[#f6f6f6]">
              <textarea
                value={embedCode}
                readOnly
                title="Embed code"
                placeholder="Embed code will appear here"
                className="w-full px-3 py-3 pr-24 text-[10px] font-mono bg-transparent border-none outline-none resize-none text-foreground min-h-[90px] overflow-hidden"
                rows={3}
                aria-label="Embed code"
                id="embed-code-textarea"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="absolute top-0 right-0 flex items-center gap-2 px-8 py-3 border-l border-gray-300 hover:bg-gray-200 transition-colors text-xs font-medium text-foreground h-full"
                aria-label="Copy embed code"
              >
                {isCopied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-2 pt-2">
            <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pl-2">
              <li>Badge updates automatically when your users change</li>
              <li>Clicking the badge links to your TrustdB profile</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
