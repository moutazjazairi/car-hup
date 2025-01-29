import type { Metadata } from "next";
import "./globals.css";
import {Navbar} from "@/components";
import {Footer} from "@/components";

export const metadata: Metadata = {
  title: "Moutaz Car Hub",
  description: "The Best car renatl in the world, Discover the veraites of cars here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="relative"
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
