import type { Metadata } from "next";
import { Inter, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansSC = Noto_Sans_SC({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-sc"
});

export const metadata: Metadata = {
  title: "SHAX Digital - Professional Digital Advertising & Cultural Services",
  description: "SHAX Digital provides professional services including digital advertising production, creative design, cultural event organization, and comprehensive business solutions.",
  keywords: "digital advertising, creative design, cultural arts, media agency, Wenzhou, Taishun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansSC.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

