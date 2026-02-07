import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Layout from "@/src/components/commons/layout/layout";
import { Analytics } from "@vercel/analytics/next";
import { BASE_METADATA } from "@/src/constants/constants";

const inter = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = BASE_METADATA;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className={inter.className}>
        <Layout>
          <main className="pt-[76px] max-w-[1024px] mx-auto w-full">
            {children}
          </main>
        </Layout>
        <Analytics />
      </body>
    </html>
  );
}
