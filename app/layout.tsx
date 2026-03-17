import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northstar English Portal",
  description: "A learning portal for English students and teachers."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
