import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-5D4N3KXM";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FFCC00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tegbe.com.br"),
  title: {
    default: "Tegbe | Consultoria Oficial Mercado Livre & Shopee",
    template: "%s | Tegbe Consultoria",
  },
  description:
    "A única Consultoria Oficial Mercado Livre que assume o operacional da sua loja. Gestão completa de E-commerce, Full Commerce, Ads e Logística para escalar seu faturamento.",
  keywords: [
    "Consultoria Mercado Livre",
    "Consultoria Shopee",
    "Gestão de Ecommerce",
    "Consultoria Oficial",
    "Mercado Livre Platinum",
    "Agência de Ecommerce",
    "Agência de Marketing",
    "Tegpro",
    "Full Commerce",
    "Tegbe",
  ],
  authors: [{ name: "Tegbe" }, { name: "Mavellium" }],
  creator: "Mavellium",
  publisher: "Tegbe",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Tegbe | Escale suas vendas no Mercado Livre e Shopee",
    description: "Sua operação travou? Nós assumimos o operacional e destravamos seu lucro. Consultoria Oficial Certificada.",
    url: "https://tegbe.com.br",
    siteName: "Tegbe Consultoria",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Crie uma imagem 1200x630px e coloque na pasta public
        width: 1200,
        height: 630,
        alt: "Tegbe Consultoria Oficial",
      },
    ],
  }, 
  twitter: {
    card: "summary_large_image",
    title: "Tegbe | Consultoria Oficial de E-commerce",
    description: "Escale suas vendas no Mercado Livre e Shopee com gestão operacional de elite.",
    images: ["/og-image.png"],
  },
  // Configurações de Robôs (SEO Técnico)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Consultoria de Negócios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SCHEMA MARKUP (JSON-LD)
  // Isso é o que alimenta o AIO (ChatGPT, Gemini, Google SGE)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService", // Ou 'Consulting'
    "name": "Tegbe | Agência de Marketing e Cursos",
    "image": "https://tegbe.com.br/logo-tegbe-header.svg",
    "description": "Consultoria Oficial Mercado Livre e Shopee focada em gestão operacional e escala de vendas.",
    "url": "https://tegbe.com.br",
    "telephone": "+5514991779502", // Telefone do Doni/Comercial
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Garça", // Ou Garça, se preferir focar no local da sede
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-22.2167", // Coordenadas aproximadas de Garça/SP (ajuste se tiver endereço exato)
      "longitude": "-49.6500"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.instagram.com/tegbecoomerce",
      "https://www.linkedin.com/company/tegbe"
    ],
    "priceRange": "$$$",
    "founder": {
      "@type": "Person",
      "name": "Doni"
    }
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-[#FFCC00] selection:text-black`}
      >
        {/* Injeção do Schema Markup */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* GTM Head */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* GTM noscript */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        {children}
      </body>
    </html>
  );
}