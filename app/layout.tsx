import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { metaData } from "@/data/metaData";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const inter = Inter({ subsets: ["cyrillic"] });

import { WebVitals } from './_components/web-vitals'

export const metadata: Metadata = {
  metadataBase: new URL(metaData.siteURL),
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
      <body className={inter.className}>
        <Header/>
        <WebVitals/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
