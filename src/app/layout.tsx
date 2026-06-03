import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Muhammad Rajeel Siddiqui | Portfolio',
  description: 'Full-Stack Developer Specializing in React, Next.js, and Django',
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
