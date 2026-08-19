import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import dynamic from "next/dynamic";

const Chatbot = dynamic(() => import("@/components/Chatbot"), { ssr: false });
const CookieConsent = dynamic(() => import("@/components/CookieConsent"), { ssr: false });
const FloatingSocials = dynamic(() => import("@/components/FloatingSocials"), { ssr: false });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://havilahpro.com"),
  title: "Havilah Pro | Media & Growth",
  description: "Stories that Inspire. Films that Endure. Brands that Live. Premium photography, videography, and digital marketing services.",
  keywords: [
    "photography",
    "videography",
    "digital marketing",
    "Havilah Pro",
    "Havilah Media and Growth",
    "premium production house",
    "filmmaking",
    "multimedia",
    "media agency"
  ],
  verification: {
    google: [
      "nCCuFORTrwEqEaOxVVE49x0IJMf5ISz52eAXWYXEIiI",
      "ZCpkRcE0jbIKfvvhgdw8zNbSD-_fxY_K809gEl9U-E4"
    ],
  },
  openGraph: {
    title: "Havilah Pro | Media & Growth",
    description: "Premium photography, videography, and digital marketing services.",
    url: "https://havilahpro.com",
    siteName: "Havilah Pro",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <CookieConsentProvider>
          <LanguageProvider>
            <ThemeProvider>
              <Preloader />
              <Navbar />
              <FloatingSocials />
              <main className="flex-grow">
                {children}
              </main>
              <Chatbot />
              <CookieConsent />
              <Footer />
            </ThemeProvider>
          </LanguageProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

