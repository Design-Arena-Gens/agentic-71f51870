import type { Metadata } from "next";
import { Rokkitt, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const headingFont = Rokkitt({ subsets: ["latin"], variable: "--font-heading" });
const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Starfall Chronicles",
  description:
    "An original web novel following a starmancer charting destinies across the celestial weave."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
