"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Spotlight } from "@/app/(home)/startup/[name]/spotlight";
import { SpotlightModal } from "./spotlight-modal";
import { Megaphone } from "lucide-react";
import type { SpotlightItem } from "./spotlight-data";

interface SpotlightSectionProps {
  spotlights: SpotlightItem[];
  showAdvertise?: boolean;
  startNumber?: number;
}

// Hook for scrambling text
function useScramblingText(originalText: string, isScrambling: boolean, interval = 50) {
  const [text, setText] = useState(originalText);

  useEffect(() => {
    if (!isScrambling || !originalText) {
      setText(originalText);
      return;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let scrambleCount = 0;
    const maxScrambles = 10; // Number of scrambles before showing original

    const intervalId = setInterval(() => {
      if (scrambleCount >= maxScrambles) {
        setText(originalText);
        clearInterval(intervalId);
        return;
      }

      let scrambled = "";
      for (let i = 0; i < originalText.length; i++) {
        if (originalText[i] === " ") {
          scrambled += " ";
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setText(scrambled);
      scrambleCount++;
    }, interval);

    return () => clearInterval(intervalId);
  }, [originalText, isScrambling, interval]);

  return text;
}

function SpotlightSection({
  spotlights,
  showAdvertise = false,
  startNumber = 1,
}: SpotlightSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rotationCycle, setRotationCycle] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);
  const totalCards = 5;

  // Determine which spotlights to show for this section initially
  // Left section: spots 1-5, Right section: spots 6-10
  const sectionStartIndex = startNumber === 1 ? 0 : 5;

  // Rotate through all available spotlights every 5 seconds
  useEffect(() => {
    if (spotlights.length <= 10) {
      // Not enough spotlights to rotate (need more than 10 to have rotation)
      return;
    }

    const rotationInterval = setInterval(() => {
      setIsScrambling(true);
      
      // After scrambling animation, rotate to next cycle
      setTimeout(() => {
        setRotationCycle((prev) => prev + 1);
        setIsScrambling(false);
      }, 500); // Scramble duration
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(rotationInterval);
  }, [spotlights.length]);

  // Get the current spotlight for each card position
  const getSpotlightForCard = (cardIndex: number): SpotlightItem | null => {
    if (spotlights.length === 0) {
      return null;
    }

    if (spotlights.length <= 10) {
      // Static display: show spotlights in their assigned positions
      const index = sectionStartIndex + cardIndex;
      return spotlights[index] || null;
    }

    // Rotation mode: when we have more than 10 spotlights, rotate through them
    // Each card position cycles through all available spotlights
    // Left section cards (0-4) and right section cards (5-9) rotate independently
    const globalCardIndex = sectionStartIndex + cardIndex; // 0-4 for left, 5-9 for right
    
    // Each position cycles through spotlights with a step based on rotation cycle
    // This ensures all 10 positions show different spotlights at any given time
    const spotlightIndex = (globalCardIndex + rotationCycle) % spotlights.length;
    
    return spotlights[spotlightIndex] || null;
  };

  return (
    <>
      <div className="flex flex-col gap-1.5 w-full h-full justify-between">
        <div className="flex flex-col gap-1.5 flex-1 min-h-0">
          {Array.from({ length: totalCards }).map((_, index) => {
            const cardNumber = String(startNumber + index).padStart(2, "0");
            const spotlight = getSpotlightForCard(index);

            if (spotlight) {
              return (
                <ScramblingSpotlight
                  key={`spotlight-${spotlight.id}-${index}-${rotationCycle}`}
                  number={cardNumber}
                  spotlight={spotlight}
                  isScrambling={isScrambling}
                />
              );
            }

            // Empty card
            return (
              <Spotlight
                key={`empty-${index}`}
                number={cardNumber}
                isEmpty={true}
                onGetSeenClick={() => setIsModalOpen(true)}
              />
            );
          })}
        </div>
        <div className="flex items-center gap-1.5 mb-2 text-gray-500 text-[10px] mt-1 shrink-0">
          {showAdvertise && (
            <>
              <Megaphone className="w-2.5 h-2.5" />
              <button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-gray-700"
              >
                Get seen
              </button>
            </>
          )}
        </div>
      </div>
      <SpotlightModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}

// Component that handles scrambling for individual spotlight
function ScramblingSpotlight({
  number,
  spotlight,
  isScrambling,
}: {
  number?: string;
  spotlight: SpotlightItem;
  isScrambling: boolean;
}) {
  const [logoOpacity, setLogoOpacity] = useState(0);
  const scrambledTitle = useScramblingText(spotlight.title || "", isScrambling);
  const scrambledDescription = useScramblingText(spotlight.description || "", isScrambling);

  // Handle logo fade transition - fade in when component mounts or after scrambling
  useEffect(() => {
    if (isScrambling) {
      // Fade out during scrambling
      setLogoOpacity(0);
    } else {
      // Fade in after scrambling completes or on initial mount
      const timer = setTimeout(() => {
        setLogoOpacity(1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isScrambling, spotlight.id]);

  // Render icon on client side with transition
  const icon =
    spotlight.icon ||
    (spotlight.logo ? (
      <div
        className="transition-opacity duration-500 ease-in-out"
        style={{ opacity: logoOpacity }}
      >
        <Image
          src={spotlight.logo}
          alt={spotlight.title}
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
    ) : (
      <div
        className="w-[60px] h-[60px] bg-gray-200 rounded flex items-center justify-center transition-opacity duration-500 ease-in-out"
        style={{ opacity: logoOpacity }}
      >
        <span className="text-2xl">
          {(spotlight.name || spotlight.title)
            .charAt(0)
            .toUpperCase()}
        </span>
      </div>
    ));

  return (
    <Spotlight
      number={number}
      icon={icon}
      title={scrambledTitle}
      description={scrambledDescription}
      backgroundColor={spotlight.backgroundColor}
      url={spotlight.url}
    />
  );
}

export { SpotlightSection };
