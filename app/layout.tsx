import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Home",
  description: "A notebook for projects, writing, and pictures.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={sourceSerif.variable}><body>{children}</body></html>;
}
