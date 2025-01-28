import "@/styles/globals.css";
import { metadata as metadataConfig } from "@/config";
import { Suspense } from "react";
import { AppStoreProvider } from "@/hooks/use-store";
import Navbar from "@/components/UI/Navbar";
import HotToast from "@/components/UI/HotToast";
import Footer from "@/components/UI/Footer";
import { InterFont } from "@/styles/fonts";
import { clsx } from "@/utils/clsx";
import { getURL } from "@/utils/helpers";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: getURL(),
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
      className={clsx(InterFont.className)}
      suppressHydrationWarning={true}
    >
      <body className="bg-background text-foreground">
        <AppStoreProvider>
          <div className="min-h-screen grid grid-rows-[auto,1fr]">
            <Navbar />
            <div className="layout-grid w-full overflow-hidden">
              <main id="skip">{children}</main>
              <Footer />
            </div>
          </div>
        </AppStoreProvider>
        <Suspense>
          <HotToast />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
