import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { metadata as metadataConfig } from "@/config";
import { Suspense } from "react";
import { AppStoreProvider } from "@/hooks/use-store";
import Navbar from "@/components/UI/Navbar";
import HotToast from "@/components/UI/HotToast";
import Footer from "@/components/UI/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: metadataConfig.title,
  description: metadataConfig.description
};

const InterFont = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={InterFont.className}
      suppressHydrationWarning={true}
    >
      <body className="bg-background text-foreground min-h-screen">
        <AppStoreProvider className="_grid grid-rows-[auto,1fr,auto] min-h-screen">
          <Navbar />
          <main id="skip">{children}</main>
          <Footer />
        </AppStoreProvider>
        <Suspense>
          <HotToast />
        </Suspense>
      </body>
    </html>
  );
}
