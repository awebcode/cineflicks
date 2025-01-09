import { Metadata, type Viewport } from "next";

export const defaultSEOdata: Metadata = {
  title: "Cineflicks - Stream Movies & TV Shows Online",
  description:
    "Cineflicks is your ultimate destination to stream movies and TV shows online. Enjoy a vast collection of entertainment at your fingertips.",
  keywords: [
    "watch movies online",
    "stream movies",
    "online TV shows",
    "movie streaming",
    "Cineflicks",
    "TV shows online",
    "free movies",
    "HD streaming",
    "latest movies",
    "Cineflicks streaming",
    "online cinema",
    "movie platform",
    "entertainment",
    "online streaming platform",
    "awebcode",
  ],
  openGraph: {
    title: "Cineflicks - Unlimited Entertainment",
    description:
      "Cineflicks offers an extensive library of movies and TV shows. Watch anytime, anywhere on any device.",
    url: "https://cineflicks.vercel.app", // Replace with the actual Cineflicks URL
    siteName: "Cineflicks",
    locale: "en",
    type: "website",
  },
  twitter: {
    title: "Cineflicks - Stream Movies & TV Shows Online",
    description:
      "Stream the latest movies and TV shows online on Cineflicks. Enjoy unlimited entertainment anytime, anywhere.",
    card: "summary_large_image",
    site: "@cineflicks", // Replace with actual Twitter handle
    creator: "@cineflicks", // Replace with actual Twitter handle
  },
  appleWebApp: {
    title: "Cineflicks - Stream Movies & TV Shows",
    capable: true,
    statusBarStyle: "default",
  },
  facebook: {
    appId: "987654321", // Replace with the actual Facebook App ID
  },
  robots: {
    index: true,
    follow: true,
    googleBot: "all",
  },
  icons: [
    {
      url: "https://cineflicks.vercel.app/og-image.png", // Replace with actual Cineflicks icon URL
      type: "image/png",
      sizes: "512x512",
    },
    {
      url: "https://cineflicks.vercel.app/favicon.ico", // Replace with actual favicon URL
      type: "image/x-icon",
      sizes: "16x16",
    },
  ],
  applicationName: "Cineflicks",
  authors: [
    { name: "Cineflicks Team", url: "https://cineflicks.vercel.app" }, // Replace with actual team URL
  ],
  verification: {
    google: "google-site-verification=9876543210", // Replace with actual verification code
    yandex: "yandex-verification=9876543210", // Replace with actual verification code
    yahoo: "y_key=9876543210", // Replace with actual verification code
  },
  manifest: "https://cineflicks.vercel.app/manifest.webmanifest", // Replace with actual manifest URL
  appLinks: {
    web: [{ url: "https://cineflicks.vercel.app", should_fallback: true }],
  },
  creator: "Cineflicks",
  category: "movies, entertainment, streaming",
};

// Default viewport data
export const defaultViewPort: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#000000", // Black for movie streaming theme
  minimumScale: 1,
  interactiveWidget: "resizes-content",
};
