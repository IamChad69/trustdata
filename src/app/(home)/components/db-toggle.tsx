"use client";

import Image from "next/image";
import { DatabaseProvider, getProviderConfig } from "@/lib/database-providers";

interface DbToggleProps {
  provider: DatabaseProvider;
  selected?: boolean;
  onSelect?: () => void;
  onHover?: () => void;
  onHoverEnd?: () => void;
}

export default function DbToggle({
  provider,
  selected = false,
  onSelect,
  onHover,
  onHoverEnd,
}: DbToggleProps) {
  const providerConfig = getProviderConfig(provider);

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
      aria-label={`Select ${providerConfig.name} database provider`}
      className="focus:outline-none focus-visible:outline-none border-0 p-0 bg-transparent w-full h-full"
    >
      <div
        className={`w-full h-full p-2 flex items-center justify-center border rounded-none transition-all duration-200 ${
          selected ? "bg-[#f6f6f6]" : "hover:border-gray-500"
        }`}
      >
        <Image
          src={providerConfig.logoPath}
          alt={providerConfig.logoAlt}
          width={40}
          height={40}
          className="object-contain "
        />
      </div>
    </button>
  );
}
