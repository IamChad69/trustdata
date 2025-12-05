import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono, Shadows_Into_Light } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { SpotlightSection } from "@/app/components/spotlight-section";
import { MobileSpotlightCarousel } from "@/app/components/mobile-spotlight-carousel";
import { Footer } from "@/app/(home)/components/footer";
import { prisma } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { getBaseUrl } from "@/utils/env";

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
const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: {
    default: "TrustdB | Real SaaS Metrics & Startup Data",
    template: "%s | TrustdB",
  },
  description:
    "TrustdB - Discover real SaaS metrics and startup data. Browse verified MRR, growth rates, and user metrics from trusted startups. The trusted source for SaaS metrics and startup analytics.",
  keywords: [
    "TrustdB",
    "SaaS metrics",
    "startup metrics",
    "MRR",
    "monthly recurring revenue",
    "SaaS data",
    "startup analytics",
    "real metrics",
    "SaaS companies",
    "startup database",
    "SaaS benchmarks",
    "trusted metrics",
  ],
  authors: [{ name: "TrustdB" }],
  creator: "TrustdB",
  publisher: "TrustdB",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "TrustdB | Real SaaS Metrics & Startup Data",
    description:
      "Discover real SaaS metrics and startup data. Browse verified MRR, growth rates, and user metrics from trusted startups.",
    url: baseUrl,
    siteName: "TrustdB",
    images: [
      {
        url: `${baseUrl}/og_image.png`,
        width: 1200,
        height: 630,
        alt: "TrustdB - Real SaaS Metrics & Startup Data",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustdB | Real SaaS Metrics",
    description:
      "Discover real SaaS metrics and startup data. Browse verified MRR, growth rates, and user metrics.",
    images: [`${baseUrl}/og_image.png`],
    creator: "@trustdb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

const getCachedSpotlights = unstable_cache(
  async () => {
    try {
      const now = new Date();

      const spotlights = await prisma.spotlight.findMany({
        where: {
          isActive: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
        orderBy: [{ position: "asc" }, { createdAt: "desc" }],
        take: 20,
      });
      return spotlights;
    } catch (error) {
      console.error("Error fetching spotlights:", error);
      return [];
    }
  },
  ["spotlights"],
  {
    revalidate: 60, // Revalidate every 60 seconds
    tags: ["spotlights"],
  }
);

async function getSpotlights() {
  return getCachedSpotlights();
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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "TrustdB",
        description:
          "TrustdB - Discover real SaaS metrics and startup data. Browse verified MRR, growth rates, and user metrics from trusted startups.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "TrustdB",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/trustdb-logomark.svg`,
        },
        sameAs: [
          // Add social media URLs when available
          // "https://twitter.com/trustdb",
          // "https://linkedin.com/company/trustdb",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: "TrustdB | Real SaaS Metrics & Startup Data",
        description:
          "Discover real SaaS metrics and startup data. Browse verified MRR, growth rates, and user metrics from trusted startups.",
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        about: {
          "@id": `${baseUrl}/#organization`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${baseUrl}/og_image.png`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#itemlist`,
        name: "Real SaaS Startups",
        description:
          "List of real SaaS startups with verified metrics including MRR, growth rates, and user data",
        itemListElement: spotlights.slice(0, 10).map((spotlight, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: spotlight.name,
            description: spotlight.tagline,
            url: spotlight.url,
          },
        })),
      },
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-screen lg:overflow-hidden"
    >
      <body
        className={`${orbitron.variable} ${robotoMono.variable} ${shadowsIntoLight.variable} font-roboto-mono antialiased bg-[#e4e4e4] h-screen lg:overflow-hidden`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <TRPCReactProvider>
          <Toaster />
          {/* Mobile Spotlight Carousel - visible only on small screens */}
          <MobileSpotlightCarousel spotlights={transformedSpotlights} />
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_14fr_3fr] gap-0 lg:gap-6 h-screen lg:h-screen w-full box-border">
            {/* Left Spotlight Section */}
            <aside className="hidden lg:flex flex-col h-full pt-6 min-w-0 lg:px-4">
              <SpotlightSection
                spotlights={transformedSpotlights}
                showAdvertise={false}
                startNumber={1}
              />
            </aside>

            {/* Main Content */}
            <main className="h-full overflow-y-auto min-w-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col px-4 sm:px-6 lg:px-0">
              <div className="flex-1">{children}</div>
              <Footer />
            </main>

            {/* Right Spotlight Section */}
            <aside className="hidden lg:flex flex-col h-full pt-6 min-w-0 lg:px-4">
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
