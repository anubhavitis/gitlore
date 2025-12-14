import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "GitLore - Git Story Narrator",
    template: "%s | GitLore",
  },
  description:
    "Transform GitHub repositories into engaging narratives. Discover the story behind any open source project.",
  keywords: [
    "github",
    "git",
    "story",
    "narrative",
    "repository",
    "open source",
    "commits",
    "contributors",
  ],
  authors: [{ name: "GitLore" }],
  creator: "GitLore",
  metadataBase: new URL("https://gitlore.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gitlore.vercel.app",
    title: "GitLore - Git Story Narrator",
    description: "Transform GitHub repositories into engaging narratives",
    siteName: "GitLore",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitLore - Git Story Narrator",
    description: "Transform GitHub repositories into engaging narratives",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#0a0a0c] text-gray-100 antialiased">
        <QueryProvider>
          <div className="min-h-screen w-full relative">
            {/* Dark Dot Matrix */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundColor: "#0a0a0a",
                backgroundImage: `
       radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
       radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px)
     `,
                backgroundSize: "10px 10px",
                imageRendering: "pixelated",
              }}
            />
            {/* Your Content Here */}
            {children}
          </div>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
