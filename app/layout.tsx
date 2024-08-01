import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.scss";

const BCSans = localFont({ src: './2023_01_01_BCSans-Regular_2f.otf'})

export const metadata: Metadata = {
  title: "Joh Yoshida's SDPR webform",
  description: "This is my submission for the assignment portion of the Ministry of Social Development and Poverty Reduction's ISL 18R Full Stack Developer competition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={BCSans.className}>{children}</body>
    </html>
  );
}
