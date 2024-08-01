import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <link rel="stylesheet" type="text/css" href="http://ws1.postescanada-canadapost.ca/css/addresscomplete-2.50.min.css?key=ca78-gm59-wf29-cw59" />
        <script type="text/javascript" src="http://ws1.postescanada-canadapost.ca/js/addresscomplete-2.50.min.js?key=ca78-gm59-wf29-cw59"></script>
        {children}
      </body>
    </html>
  );
}
