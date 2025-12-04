"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Megaphone } from "lucide-react";
import { SpotlightModal } from "./spotlight-modal";
import type { SpotlightItem } from "./spotlight-data";

interface MobileSpotlightCarouselProps {
	spotlights: SpotlightItem[];
}

export function MobileSpotlightCarousel({
	spotlights,
}: MobileSpotlightCarouselProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="lg:hidden w-full bg-[#e4e4e4] border-b border-gray-200 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
			<div className="flex gap-2 px-4 py-3 min-w-max">
				{spotlights.slice(0, 10).map((spotlight, index) => (
					<MobileSpotlightCard
						key={spotlight.id || index}
						spotlight={spotlight}
					/>
				))}
				{/* Empty spotlight card with icon only */}
				<EmptyMobileSpotlightCard onGetSeenClick={() => setIsModalOpen(true)} />
			</div>
			<SpotlightModal open={isModalOpen} onOpenChange={setIsModalOpen} />
		</div>
	);
}

function MobileSpotlightCard({ spotlight }: { spotlight: SpotlightItem }) {
	const [logoOpacity, setLogoOpacity] = useState(1);

	useEffect(() => {
		setLogoOpacity(1);
	}, [spotlight.id]);

	const icon =
		spotlight.icon ||
		(spotlight.logo ? (
			<div
				className="transition-opacity duration-300 ease-in-out"
				style={{ opacity: logoOpacity }}
			>
				<Image
					src={spotlight.logo}
					alt={spotlight.title}
					width={32}
					height={32}
					className="object-contain rounded"
				/>
			</div>
		) : (
			<div
				className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center transition-opacity duration-300 ease-in-out"
				style={{ opacity: logoOpacity }}
			>
				<span className="text-sm font-medium">
					{(spotlight.name || spotlight.title).charAt(0).toUpperCase()}
				</span>
			</div>
		));

	const cardContent = (
    <div
      className="flex items-center gap-2 px-3 py-2  border border-gray-300 bg-[#f3f4f6] hover:bg-gray-50 transition-colors shrink-0"
      style={{
        backgroundColor: spotlight.backgroundColor || "#ffffff",
      }}
    >
      <div className="shrink-0">{icon}</div>
      <span className="text-xs font-medium text-gray-900 whitespace-nowrap">
        {spotlight.title}
      </span>
    </div>
  );

	if (spotlight.url) {
		return (
			<Link
				href={spotlight.url}
				target="_blank"
				rel="noopener noreferrer"
				className="block"
			>
				{cardContent}
			</Link>
		);
	}

	return cardContent;
}

function EmptyMobileSpotlightCard({
	onGetSeenClick,
}: {
	onGetSeenClick: () => void;
}) {
	return (
		<button
			type="button"
			title="Get Seen"
			onClick={onGetSeenClick}
			className="flex items-center justify-center w-12 h-12 border border-gray-300 border-dashed px-2 py-1 bg-transparent hover:bg-gray-50 transition-colors  "
		>
			<Megaphone className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors" />
		</button>
	);
}

