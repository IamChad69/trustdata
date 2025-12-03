export default function Loading() {
	return (
		<main className="min-h-screen">
			<div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pb-24">
				<div className="mt-8 mx-auto">
					{/* Back Button Skeleton */}
					<div className="inline-flex border p-2 border-gray-300 items-center gap-2 mb-6 animate-pulse">
						<div className="w-4 h-4 bg-gray-300 rounded"></div>
						<div className="h-4 w-24 bg-gray-300 rounded"></div>
					</div>

					{/* Startup Header Container */}
					<div className="border border-gray-300 overflow-hidden bg-[#f6f6f6] relative corner-brackets-all">
						<div className="flex items-stretch h-full">
							{/* Startup Header Skeleton (Left - flex-1) */}
							<div className="hidden md:flex border-gray-300 flex-1">
								<div className="flex-1 min-w-0 flex flex-col">
									{/* Logo and Startup Info Row */}
									<div className="px-4 mt-12 flex-1">
										<div className="flex items-start gap-6">
											{/* Logo Skeleton */}
											<div className="shrink-0">
												<div className="w-24 h-24 bg-gray-300 rounded animate-pulse"></div>
											</div>
											{/* Startup Info Skeleton */}
											<div className="flex-1 min-w-0 space-y-3">
												<div className="flex items-center gap-3">
													<div className="h-9 w-48 bg-gray-300 rounded animate-pulse"></div>
													<div className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
												</div>
												<div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
												<div className="h-3 w-full bg-gray-300 rounded animate-pulse"></div>
												<div className="h-3 w-2/3 bg-gray-300 rounded animate-pulse"></div>
												<div className="h-6 w-20 bg-gray-300 rounded animate-pulse mt-4"></div>
											</div>
										</div>
									</div>
									{/* Metrics Grid Skeleton */}
									<div className="border-t border-gray-300">
										<div className="grid grid-cols-2 md:grid-cols-3 h-16">
											{[1, 2, 3].map((i) => (
												<div
													key={i}
													className={`flex flex-col items-center justify-center h-16 box-border border-gray-300 ${
														i < 3 ? "border-r" : ""
													}`}
												>
													<div className="h-5 w-12 bg-gray-300 rounded mb-1 animate-pulse"></div>
													<div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>

							{/* Stats Section Skeleton (Right 60%) */}
							<div className="flex w-[60%] h-full self-stretch">
								<div className="flex-1 flex flex-col">
									{/* Unified Grid Container */}
									<div className="grid grid-cols-2 grid-rows-[48px_1fr_64px] flex-1 border-l border-r border-gray-300">
										{/* Top Row - Left Column (Two Buttons) */}
										<div className="grid grid-cols-2 border-r border-b border-gray-300">
											<div className="flex items-center justify-center border-r border-gray-300">
												<div className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
											</div>
											<div className="flex items-center justify-center">
												<div className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
											</div>
										</div>

										{/* Top Row - Right Column (Edit Button) */}
										<div className="flex items-center justify-center gap-2 border-b border-gray-300">
											<div className="w-3 h-3 bg-gray-300 rounded animate-pulse"></div>
											<div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
										</div>

										{/* Middle Row - Left Column (Total Users) */}
										<div className="py-10 items-center bg-[#f6f6f6] border-r border-b border-gray-300 px-4 justify-center flex flex-col relative">
											<div className="h-3 w-20 bg-gray-300 rounded mb-6 animate-pulse"></div>
											<div className="h-9 w-16 bg-gray-300 rounded mb-6 animate-pulse"></div>
											<div className="h-3 w-12 bg-gray-300 rounded mb-1 animate-pulse"></div>
											<div className="h-3 w-16 bg-gray-300 rounded animate-pulse"></div>
										</div>

										{/* Middle Row - Right Column (New Users) */}
										<div className="px-4 border-b border-gray-300 items-center justify-center flex flex-col py-10">
											<div className="h-3 w-20 bg-gray-300 rounded mb-6 animate-pulse"></div>
											<div className="h-9 w-8 bg-gray-300 rounded mb-2 animate-pulse"></div>
											<div className="h-3 w-20 bg-gray-300 rounded mb-1 animate-pulse"></div>
											<div className="h-3 w-16 bg-gray-300 rounded animate-pulse"></div>
										</div>

										{/* Bottom Row - Left Column (X Logo) */}
										<div className="flex items-center justify-center h-16 border-r border-gray-300">
											<div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
										</div>

										{/* Bottom Row - Right Column (Visit Button) */}
										<div className="flex items-center justify-center gap-1.5 h-16 bg-gray-300 animate-pulse">
											<div className="h-4 w-12 bg-gray-400 rounded"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Growth Graph Skeleton */}
					<div className="mt-6">
						<div className="bg-[#f6f6f6] border border-gray-300">
							<div className="flex items-center justify-between p-6 mb-4">
								<div className="space-y-2">
									<div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
									<div className="h-3 w-32 bg-gray-300 rounded animate-pulse"></div>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
									<div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
								</div>
							</div>
							<div className="px-6 py-2">
								<div className="h-[400px] bg-gray-200 animate-pulse"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
