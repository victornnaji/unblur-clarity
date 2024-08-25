import { Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { config } from "@/config";
import Navbar from "@/components/UI/Navbar";
import { Suspense } from "react";
import HotToast from "@/components/UI/HotToast";
import { AppStoreProvider } from "@/hooks/use-store";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: config.title,
  description: config.description,
};

const SG = Space_Grotesk({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={SG.className}>
      <body className="_grid grid-rows-[auto,1fr] bg-background text-foreground min-h-screen">
        <Navbar />
        <AppStoreProvider>
          <main id="skip">{children}</main>
        </AppStoreProvider>
        <Suspense>
          <HotToast />
        </Suspense>
      </body>
    </html>
  );
}
