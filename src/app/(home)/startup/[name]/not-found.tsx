import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { SiteHeader } from "@/app/(home)/components/site-header";

export default function NotFound() {
	return (
		<main className="min-h-screen bg-[#F3F4F6] relative overflow-hidden font-sans selection:bg-blue-100">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

			<div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
				<SiteHeader />

				<div className="mt-8 max-w-4xl mx-auto">
					<div className="bg-white rounded-xl shadow-sm border border-gray-200/60 p-12 text-center">
						<div className="flex flex-col items-center gap-4">
							<AlertCircle className="w-16 h-16 text-muted-foreground" />
							<h1 className="text-3xl font-bold text-foreground">
								Startup Not Found
							</h1>
							<p className="text-muted-foreground max-w-md">
								The startup you&apos;re looking for doesn&apos;t exist or has been removed.
							</p>
							<Link
								href="/"
								className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-lg hover:bg-black transition-colors"
							>
								<ArrowLeft className="w-4 h-4" />
								<span>Back to home</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

