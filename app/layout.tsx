import { Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";
import { config } from "@/config";
import Navbar from "@/components/UI/Navbar";

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
      <body className="_grid bg-background text-foreground">
        <Navbar />
        <main className="min-h-screen flex flex-col items-center" id="skip">
          {children}
        </main>
      </body>
    </html>
  );
}
