import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northstar English 포털",
  description: "한국인 영어회화 수강생과 선생님을 위한 학습 포털"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
