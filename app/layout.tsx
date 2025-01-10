import { Geist, Geist_Mono,Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { generateSEO, generateViewport } from "./config/seo/seo";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Foother from "@/components/common/Footer";
import Footer from "@/components/common/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight:["500","700","900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});
export const metadata= generateSEO({});

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
        className={`${geistSans.variable} ${geistMono.variable}  antialiased min-h-screen flex flex-col`}
      >
        <Toaster />

        <div className="flex-grow">
          <SessionProvider session={session}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </SessionProvider>
        </div>
        <Footer />
      </body>
    </html>
  );
}
