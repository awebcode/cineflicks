import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { generateSEO, generateViewport } from "./config/seo/seo";
import "./globals.css";

const inter = Inter({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = generateSEO({});

export const viewport = generateViewport({});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col w-full`} // Use Inter font here
      >
        <Toaster />

        <div className="flex-grow ">
          <SessionProvider session={session}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  );
}
