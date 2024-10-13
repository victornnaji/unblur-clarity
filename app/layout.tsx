import "@/styles/globals.css";
import { metadata as metadataConfig } from "@/config";
import { Suspense } from "react";
import { AppStoreProvider } from "@/hooks/use-store";
import Navbar from "@/components/UI/Navbar";
import HotToast from "@/components/UI/HotToast";
import Footer from "@/components/UI/Footer";
import { InterFont } from "@/styles/fonts";
import { clsx } from "@/utils/clsx";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: metadataConfig.title,
  description: metadataConfig.description
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(InterFont.className, "max-w-screen overflow-x-hidden")}
      suppressHydrationWarning={true}
    >
      <body className="bg-background text-foreground min-h-screen max-w-screen">
        <AppStoreProvider className="layout-grid min-h-screen">
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
