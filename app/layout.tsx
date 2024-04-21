import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { metaData } from "@/data/metaData";

const inter = Inter({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  // metadataBase: new URL(metaData.siteUrl),
  title: metaData.title,
  description: metaData.description,
  openGraph: {
    title: metaData.title,
    description: metaData.description,
    url: './',
    siteName: metaData.title,
    images: [metaData.socialBanner],
    locale: metaData.locale,
    type: 'website',
  },
  // alternates: {
  //   canonical: './',
  //   types: {
  //     'application/rss+xml': `${metaData.siteUrl}/feed.xml`,
  //   },
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={metaData.language} 
      // Фикс гидрации
      // suppressHydrationWarning
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
