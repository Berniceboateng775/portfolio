import type { Metadata } from "next";
import "./globals.css";
import DataField from "@/components/DataField";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Bernice Animwaa Boateng | Data Analyst & Software Developer",
  description:
    "Portfolio of Bernice Animwaa Boateng — data analyst and software developer. I turn messy data into clear answers and build the full-stack apps that deliver them, with Python, SQL, Excel, and React.",
  keywords: [
    "Data Analyst",
    "Software Developer",
    "Data Analysis",
    "Python",
    "SQL",
    "Power BI",
    "Excel",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Bernice Animwaa Boateng" }],
  openGraph: {
    title: "Bernice Animwaa Boateng | Data Analyst & Software Developer",
    description:
      "Data analyst and software developer turning data into decisions and building the apps that act on them.",
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
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <DataField />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
