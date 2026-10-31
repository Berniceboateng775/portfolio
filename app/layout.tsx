import type { Metadata } from "next";
import "./globals.css";
import Ambient from "@/components/Ambient";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Decide before first paint whether the opening sequence plays (once per session). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement,s=sessionStorage.getItem('bb-intro'),r=matchMedia('(prefers-reduced-motion: reduce)').matches;d.dataset.intro=s||r?'skip':'play'}catch(e){document.documentElement.dataset.intro='play'}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Ambient />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
