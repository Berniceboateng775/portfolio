import type { Metadata } from "next";
import "./globals.css";
import DataField from "@/components/DataField";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Bernice Animwaa Boateng | AI/ML Engineer & Software Developer",
  description:
    "Portfolio of Bernice Animwaa Boateng — AI/ML engineer and software developer. Building clinical ML pipelines, intelligent signal processing systems, and full-stack AI applications with Python, PyTorch, XGBoost, and React.",
  keywords: [
    "AI/ML Engineer",
    "Software Developer",
    "Machine Learning",
    "Deep Learning",
    "PyTorch",
    "XGBoost",
    "Python",
    "FastAPI",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Bernice Animwaa Boateng" }],
  openGraph: {
    title: "Bernice Animwaa Boateng | AI/ML Engineer & Software Developer",
    description:
      "AI/ML engineer and software developer building clinical ML pipelines, intelligent signal processing systems, and full-stack AI applications.",
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
