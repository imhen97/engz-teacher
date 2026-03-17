import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ENGZ 해나쌤 영어 수강 페이지",
  description: "한국인 영어회화 수강생을 위한 ENGZ 해나쌤 영어 학습 포털"
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
