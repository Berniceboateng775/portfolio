import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bernice Animwaa Boateng | Software Engineer & Data Analyst",
  description:
    "Portfolio of Bernice Animwaa Boateng - Software Engineer, Data Analyst, and Machine Learning enthusiast. Building innovative solutions with Python, React, and modern web technologies.",
  keywords: [
    "Software Engineer",
    "Data Analyst",
    "Machine Learning",
    "Python",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Bernice Animwaa Boateng" }],
  openGraph: {
    title: "Bernice Animwaa Boateng | Software Engineer",
    description:
      "Software Engineer, Data Analyst, and ML enthusiast building innovative solutions.",
    type: "website",
  },
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
