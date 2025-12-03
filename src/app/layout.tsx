import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono, Shadows_Into_Light } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { SpotlightSection } from "@/app/components/spotlight-section";
import { Footer } from "@/app/(home)/components/footer";
import { prisma } from "@/lib/db";

const orbitron = localFont({
  src: "../utils/Orbitron-VariableFont_wght.ttf",
  variable: "--font-orbitron",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const shadowsIntoLight = Shadows_Into_Light({
  variable: "--font-shadows-into-light",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
function getBaseUrl(): string {
  // Check for NEXT_PUBLIC_APP_URL first (custom domain)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  // Check for VERCEL_URL (automatically set by Vercel)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback to localhost for development
  return "http://localhost:3000";
}

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: "TrustdB - Verified Startup Metrics",
  description: "Trustpilot for SaaS metrics",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "TrustdB - Verified Startup Metrics",
    description: "Trustpilot for SaaS metrics",
    url: baseUrl,
    siteName: "TrustdB",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "TrustdB - Verified Startup Metrics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustdB - Verified Startup Metrics",
    description: "Trustpilot for SaaS metrics",
    images: ["/opengraph.png"],
  },
};

async function getSpotlights() {
  try {
    // Get all available spotlights (up to 20 when 10+ are filled)
    const totalCount = await prisma.spotlight.count();
    const takeLimit = totalCount >= 10 ? 20 : 10;

    const spotlights = await prisma.spotlight.findMany({
      orderBy: [{ position: "asc" }, { createdAt: "desc" }],
      take: takeLimit,
    });
    return spotlights;
  } catch (error) {
    console.error("Error fetching spotlights:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const spotlights = await getSpotlights();

  // Transform spotlights to serializable format
  const transformedSpotlights = spotlights.map((spotlight) => ({
    id: spotlight.id,
    logo: spotlight.logo,
    name: spotlight.name,
    title: spotlight.name,
    description: spotlight.tagline,
    backgroundColor: "#f3f4f6",
    url: spotlight.url,
  }));

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-screen overflow-hidden"
    >
      <body
        className={`${orbitron.variable} ${robotoMono.variable} ${shadowsIntoLight.variable} font-roboto-mono antialiased bg-[#e4e4e4] h-screen overflow-hidden`}
        suppressHydrationWarning
      >
        <TRPCReactProvider>
          <Toaster />
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_14fr_3fr] gap-6 h-screen w-full pl-6 pr-6 box-border">
            {/* Left Spotlight Section */}
            <aside className="hidden lg:flex flex-col h-full pt-6 min-w-0">
              <SpotlightSection
                spotlights={transformedSpotlights}
                showAdvertise={false}
                startNumber={1}
              />
            </aside>

            {/* Main Content */}
            <main className="h-full  overflow-y-auto min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col">
              <div className="flex-1">{children}</div>
              <Footer />
            </main>

            {/* Right Spotlight Section */}
            <aside className="hidden lg:flex flex-col h-full pt-6 min-w-0">
              <SpotlightSection
                spotlights={transformedSpotlights}
                showAdvertise={true}
                startNumber={6}
              />
            </aside>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
