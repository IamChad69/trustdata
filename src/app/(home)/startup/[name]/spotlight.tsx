"use client";

import React, { useId } from "react";
import { Megaphone } from "lucide-react";

interface SpotlightProps {
  number?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  backgroundColor?: string;
  isEmpty?: boolean;
  onGetSeenClick?: () => void;
  url?: string;
}

export function Spotlight({
  number,
  icon,
  title,
  description,
  backgroundColor = "#f6f6f6",
  isEmpty = false,
  onGetSeenClick,
  url,
}: SpotlightProps) {
  const id = useId();
  const uniqueId = `spotlight-${
    number?.replace(/\s+/g, "-") || "empty"
  }-${id.replace(/:/g, "-")}`;

  if (isEmpty) {
    return (
      <div
        className={`border border-gray-300 p-6 flex flex-col items-center justify-center relative h-full min-h-[150px] bg-[#f6f6f6]`}
      >
        {/* Top-left black square */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-black" />
        <div className="absolute top-2 right-2 text-black font-mono text-[10px] font-medium">
          {number}
        </div>
        {/* Empty state content */}
        <div className="flex flex-col items-center  justify-center text-center space-y-4">
          <p className="text-[10px] font-medium text-muted-foreground leading-relaxed">
            Your growth deserves a spotlight — claim your place.
          </p>
          {onGetSeenClick && (
            <button
              onClick={onGetSeenClick}
              className="flex items-center gap-2 border border-gray-300 text-black px-4 py-2  hover:bg-[#e03d26] transition-colors text-[10px] font-medium"
            >
              <Megaphone className="w-4 h-4" />
              <span>Get seen</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const cardContent = (
    <>
      <style>{`
        .${uniqueId} {
          --spotlight-bg-color: ${backgroundColor};
        }
      `}</style>
      <div
        className={`border border-gray-300 p-3 flex flex-col items-center relative h-full min-h-[150px] spotlight-bg ${uniqueId} ${
          url ? "cursor-pointer hover:opacity-90 transition-opacity" : ""
        }`}
      >
        {/* Top-left black square */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-black" />

        {/* Top-right number */}
        {number && (
          <div className="absolute top-2 right-2 text-black font-mono text-[10px] font-medium">
            {number}
          </div>
        )}

        {/* Center icon */}
        {icon && (
          <div className="flex-1 flex items-center justify-center my-2 min-h-0">
            <div className="scale-[0.65]">{icon}</div>
          </div>
        )}

        {/* Title */}
        {title && (
          <div className="text-center font-mono text-black font-bold text-[10px] mb-0.5">
            {title}
          </div>
        )}

        {/* Description */}
        {description && (
          <div className="text-center font-mono text-muted-foreground text-[10px] leading-tight px-1 line-clamp-2">
            {description}
          </div>
        )}
      </div>
    </>
  );

  // Wrap in anchor tag if URL is provided
  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
