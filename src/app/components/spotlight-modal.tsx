"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SpotlightModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MAX_SPOTS_TOTAL = 10;
const SPOTLIGHT_PRICE_CENTS = 199; // $1.99 in cents

export function SpotlightModal({ open, onOpenChange }: SpotlightModalProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [activeCount, setActiveCount] = useState<number | null>(null);

  // Fetch spotlight count when modal opens
  useEffect(() => {
    if (open) {
      fetch("/api/spotlight")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            setActiveCount(data.data.length);
          } else {
            setActiveCount(0);
          }
        })
        .catch(() => {
          setActiveCount(0);
        });
    }
  }, [open]);

  const getNextAvailableDate = (): string => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return nextMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const handleLockSpot = async () => {
    setIsLoadingPayment(true);
    setError(null);

    try {
      const response = await fetch("/api/spotlight/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: SPOTLIGHT_PRICE_CENTS,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create payment link");
      }

      // safeHandler wraps response in { success: true, data: ... }
      const paymentData = result.success ? result.data : result;

      if (paymentData?.url) {
        window.location.href = paymentData.url;
      } else {
        throw new Error("No payment URL returned from Stripe");
      }
    } catch (err) {
      setIsLoadingPayment(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setError(null);
      setIsLoadingPayment(false);
    }
    onOpenChange(open);
  };

  const isFull = activeCount !== null && activeCount >= MAX_SPOTS_TOTAL;
  const nextAvailable = getNextAvailableDate();

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl bg-[#e4e4e4]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <DialogTitle className="text-sm mt-4 font-mono text-foreground mb-2">
                Be seen on our Spotlight Wall
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Your startup deserves a spot on our Spotlight Wall. Claim your
                spot now and be seen by thousands of entrepreneurs and founders
                daily.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Availability */}
          <div className="space-y-2">
            <span className="text-xs flex items-center gap-2">
              <span className="text-[10px] border border-gray-300 px-1.5 py-1 text-muted-foreground">
                1.1
              </span>
              Availability
            </span>
            <div className="space-y-1 border border-gray-300 p-4">
              <p className="text-xs text-muted-foreground">
                Maximum spots:{" "}
                <span className="font-medium text-foreground">
                  {MAX_SPOTS_TOTAL}
                </span>
              </p>
              <p className="text-xs">
                Current status:{" "}
                {isFull ? (
                  <span className="font-medium text-orange-600">
                    All spots filled
                  </span>
                ) : (
                  <span className="font-medium text-green-600">
                    {activeCount !== null
                      ? `${MAX_SPOTS_TOTAL - activeCount} spots available`
                      : "Checking availability..."}
                  </span>
                )}
              </p>
              {isFull && (
                <p className="text-xs text-muted-foreground">
                  Next available: 1 spot for {nextAvailable} (and maybe 1 more
                  in 3 days)
                </p>
              )}
            </div>
          </div>

          {/* Lock in your spot */}
          <div className="space-y-2">
            <span className="text-xs flex items-center gap-2">
              <span className="text-[10px] border border-gray-300 px-1.5 py-1 text-muted-foreground">
                1.2
              </span>
              Lock in your spot
            </span>
            <div className="border border-gray-300 p-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                Pay a{" "}
                <strong className="font-medium text-foreground">
                  ${(SPOTLIGHT_PRICE_CENTS / 100).toLocaleString()} one-time
                  advance
                </strong>{" "}
                to lock your spot {isFull ? `for ${nextAvailable}` : "now"}.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* CTA Button */}
          <DialogFooter className="sm:justify-end mt-6 h-10">
            <button
              onClick={handleLockSpot}
              disabled={isLoadingPayment}
              className="flex items-center gap-1.5 bg-[#1A1A1A] text-white text-xs font-medium px-4 py-2 hover:bg-[#e03d26] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingPayment ? (
                "Processing..."
              ) : (
                <>
                  <span>
                    Lock spot {isFull ? `for ${nextAvailable}` : "now"}
                  </span>
                </>
              )}
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
