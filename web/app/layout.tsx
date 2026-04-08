import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reputix · AI Reputation Manager for UAE Businesses",
  description:
    "Get a free AI-powered reputation report for your restaurant or local business in the UAE. Auto-reply to reviews, crisis detection, weekly insights.",
  metadataBase: new URL("https://reputix.io"),
  openGraph: {
    title: "Reputix · AI Reputation Manager",
    description: "AI reputation management for UAE local businesses.",
    url: "https://reputix.io",
    siteName: "Reputix",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
