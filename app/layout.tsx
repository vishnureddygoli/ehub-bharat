import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { brand } from "./data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ehubbharat.com"),
  title: {
    default:
      "EHUB Bharat | Government EV Infrastructure and EV Charger Manufacturing",
    template: "%s",
  },
  description:
    "EHUB Bharat plans, manufactures, deploys and operates EV charging and energy infrastructure for governments, public-sector organizations and institutions in India.",
  applicationName: brand.name,
  authors: [{ name: brand.name, url: brand.url }],
  creator: brand.name,
  publisher: brand.name,
  category: "EV charging infrastructure",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: brand.icon,
    shortcut: brand.icon,
    apple: brand.icon,
  },
  openGraph: {
    title: "EHUB Bharat | Government EV Infrastructure",
    description:
      "An integrated EV charging infrastructure and EV charger manufacturing partner for governments, public-sector organizations and institutions.",
    url: brand.url,
    siteName: brand.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-government-projects.png",
        width: 1200,
        height: 630,
        alt: "EHUB Bharat government EV infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EHUB Bharat | Government EV Infrastructure",
    description:
      "Plan, manufacture, deploy and operate public EV charging infrastructure with EHUB Bharat.",
    images: ["/og-government-projects.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
