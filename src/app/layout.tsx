import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rajeel-dev.info"),

  title: {
    default: "Muhammad Rajeel Siddiqui – Full Stack & AI Developer in Pakistan",
    template: "%s | Muhammad Rajeel Siddiqui",
  },

  description:
    "Muhammad Rajeel Siddiqui is a Full Stack and AI Developer from Pakistan specializing in Next.js, React, Node.js, Django, Laravel and modern AI systems. View portfolio, real projects and professional experience.",

  keywords: [
    "Muhammad Rajeel Siddiqui",
    "Rajeel Siddiqui",
    "Full Stack Developer Pakistan",
    "AI Developer Pakistan",
    "Next.js Developer Pakistan",
    "React Developer Pakistan",
    "Frontend Developer Pakistan",
    "Web Developer Portfolio",
    "GenAI Developer",
    "Agentic AI Developer",
    "Genkit Developer",
    "Gemini AI Developer",
  ],

  authors: [
    {
      name: "Muhammad Rajeel Siddiqui",
      url: "https://rajeel-dev.info",
    },
  ],

  creator: "Muhammad Rajeel Siddiqui",

  openGraph: {
    title: "Muhammad Rajeel Siddiqui – Full Stack & AI Developer in Pakistan",
    description:
      "Full Stack & AI developer from Pakistan working with Next.js, React, Node.js, Django, Laravel and modern AI tools. Explore real projects, skills and contact details.",
    url: "https://rajeel-dev.info",
    siteName: "Muhammad Rajeel Siddiqui – Developer Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Rajeel Siddiqui – Full Stack & AI Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rajeel Siddiqui – Full Stack & AI Developer in Pakistan",
    description:
      "Portfolio of Muhammad Rajeel Siddiqui – Full Stack & AI Developer from Pakistan specializing in Next.js, React, Node.js, Django and Laravel.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://rajeel-dev.info/",
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
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* ✅ Person structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Rajeel Siddiqui",
              alternateName: "Rajeel Siddiqui",
              url: "https://rajeel-dev.info",
              jobTitle: "Full Stack & AI Developer",
              description:
                "Full Stack and AI Developer from Pakistan specializing in Next.js, React, Node.js, Django, Laravel and modern AI systems.",
              sameAs: [
                "https://github.com/RajeelSiddiqui1"
                // LinkedIn baad me add kar dena
              ],
              knowsAbout: [
                "Next.js",
                "React",
                "Node.js",
                "TypeScript",
                "Django",
                "Laravel",
                "MongoDB",
                "SQL",
                "Cloud Deployment",
                "DevOps",
                "Generative AI",
                "Agentic AI",
                "Genkit",
                "Gemini AI"
              ],
              nationality: "Pakistani",
              worksFor: {
                "@type": "Organization",
                name: "Freelance / Independent Developer"
              }
            }),
          }}
        />
      </head>

      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
