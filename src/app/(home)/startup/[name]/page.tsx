import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/db";
import { MetricGraph } from "./metric-graph";
import { StatsSection } from "./stats-section";
import { StartupHeader } from "./startup-header";
import Image from "next/image";

interface StartupPageProps {
  params: Promise<{ name: string }>;
}

async function getStartupByName(startupName: string) {
  try {
    const startup = await prisma.databaseConnection.findFirst({
      where: { startupName },
    });

    return startup;
  } catch (error) {
    console.error("Error fetching startup:", error);
    return null;
  }
}

export default async function StartupPage({ params }: StartupPageProps) {
  const { name } = await params;
  // Decode the name from URL
  const decodedName = decodeURIComponent(name);
  const startup = await getStartupByName(decodedName);

  if (!startup) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-24">
        <div className="mt-4 sm:mt-8 mx-auto max-w-7xl">
          {/* Back Button */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <Link
              href="/"
              className="inline-flex border p-2 border-gray-300 items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </Link>
            <Image
              src="/trustdb-logomark.svg"
              alt="Logo"
              width={120}
              height={120}
              className="h-8 w-auto"
            />
          </div>

          {/* Startup Header */}
          <div className="border border-gray-300 overflow-hidden bg-[#f6f6f6] relative corner-brackets-all">
            <div className="flex flex-col sm:flex-row items-stretch h-full">
              <StartupHeader startup={startup} />

              <StatsSection
                totalUsers={startup.totalUsers}
                createdAt={startup.createdAt}
                updatedAt={startup.updatedAt}
                founderHandle={startup.founderHandle}
                startupId={startup.id}
                startupName={startup.startupName}
                slug={startup.slug}
                logo={startup.logo}
              />
            </div>{" "}
          </div>

          {/* Growth Graph */}
          <div className="mt-4 sm:mt-6">
            <MetricGraph connectionId={startup.id} />
          </div>
          <div className="mt-4 sm:mt-6 items-center justify-center gap-2 flex flex-col sm:flex-row text-center sm:text-left">
            <span className="inline-flex    text-sm font-medium  whitespace-nowrap shrink-0 ">
              <div className="flex items-center bg-[#949496] p-1 justify-center">
                <Image
                  src="/logo-icon.svg"
                  alt="Verified"
                  width={14}
                  height={14}
                />
              </div>

              <span className="text-[10px] py-0.5 text-center justify-center items-center border border-gray-300 px-1  border-l-0">
                Verified
              </span>
            </span>
            <p className="text-[10px] text-muted-foreground">
              This graph shows the growth of the startup over time.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
