import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { generateSEO, generateViewport } from "./config/seo/seo";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Footer from "@/components/common/Footer";

// Import the Inter font from Google
const inter = Inter({
  weight: ["400", "500", "700", "900"], // Define the weights you need
  subsets: ["latin"], // Only Latin characters
  variable: "--font-inter", // Use a CSS variable for the font
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
        <Footer />
      </body>
    </html>
  );
}
