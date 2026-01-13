import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-5W7HPPVZ";

// Configuração otimizada das fontes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap', // Permite que o texto apareça imediatamente com fonte fallback
  preload: true,   // Pré-carrega as fontes críticas
  adjustFontFallback: true, // Otimiza o fallback de fontes
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#FFCC00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Adicionar viewport otimizado para mobile
  viewportFit: "cover",
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
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tegbe Consultoria Oficial",
        type: "image/jpeg",
      },
    ],
  }, 
  twitter: {
    card: "summary_large_image",
    title: "Tegbe | Consultoria Oficial de E-commerce",
    description: "Escale suas vendas no Mercado Livre e Shopee com gestão operacional de elite.",
    images: ["/og-image.jpg"],
    creator: "@tegbecoomerce",
  },
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
  // Otimização de cache e pré-carregamento
  alternates: {
    canonical: "https://tegbe.com.br",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SCHEMA MARKUP (JSON-LD) otimizado para AIO e SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://tegbe.com.br/#organization",
        "name": "Tegbe | Consultoria Oficial Mercado Livre & Shopee",
        "url": "https://tegbe.com.br",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tegbe.com.br/logo-tegbe-header.svg",
          "width": 180,
          "height": 60,
          "caption": "Tegbe Consultoria"
        },
        "image": "https://tegbe.com.br/og-image.jpg",
        "description": "Consultoria Oficial Mercado Livre e Shopee focada em gestão operacional e escala de vendas.",
        "telephone": "+5514991779502",
        "email": "contato@tegbe.com.br",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Garça",
          "addressRegion": "SP",
          "addressCountry": "BR",
          "postalCode": "17400-000"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-22.2167",
          "longitude": "-49.6500"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/tegbecoomerce",
          "https://www.linkedin.com/company/tegbe",
          "https://www.facebook.com/tegbecoomerce"
        ],
        "priceRange": "$$$",
        "areaServed": {
          "@type": "Country",
          "name": "Brazil"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://tegbe.com.br/#website",
        "url": "https://tegbe.com.br",
        "name": "Tegbe Consultoria",
        "description": "Consultoria Oficial Mercado Livre e Shopee",
        "publisher": {
          "@id": "https://tegbe.com.br/#organization"
        },
        "inLanguage": "pt-BR"
      }
    ]
  };

  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect para domínios críticos - Melhora performance de carregamento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Preload para imagem OG crítica */}
        <link 
          rel="preload" 
          href="/og-image.jpg" 
          as="image" 
          type="image/jpeg"
          media="(max-width: 600px)"
        />
        
        {/* DNS prefetch para domínios adicionais */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-[#FFCC00] selection:text-black overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Injeção do Schema Markup otimizado */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive" // Carrega após interação do usuário
        />

        {/* GTM Otimizado - Script async com fallback */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
          async
        />
        
        {/* Script para pré-conexões otimizadas */}
        <Script id="preconnect-optimization" strategy="beforeInteractive">
          {`
            // Pré-carregamento otimizado de recursos críticos
            if ('requestIdleCallback' in window) {
              requestIdleCallback(() => {
                // Pré-carregar recursos não críticos após carregamento inicial
                const resources = [
                  '/_next/static/css/',
                  '/_next/static/media/'
                ];
                resources.forEach(resource => {
                  const link = document.createElement('link');
                  link.rel = 'prefetch';
                  link.href = resource;
                  document.head.appendChild(link);
                });
              });
            }
            
            // Otimização de CLS (Cumulative Layout Shift)
            document.addEventListener('DOMContentLoaded', () => {
              // Garantir que imagens tenham dimensões explícitas
              const images = document.querySelectorAll('img:not([width]):not([height])');
              images.forEach(img => {
                if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
                  img.setAttribute('loading', 'lazy');
                  img.setAttribute('decoding', 'async');
                }
              });
            });
          `}
        </Script>

        {/* GTM noscript otimizado */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ 
              display: "none", 
              visibility: "hidden",
              position: "absolute",
              left: "-9999px"
            }}
            loading="lazy"
            title="Google Tag Manager"
            aria-hidden="true"
          />
        </noscript>
        
        {/* Container principal com otimizações de renderização */}
        <div id="app-root" className="min-h-screen flex flex-col">
          {children}
        </div>

        {/* Script para métricas de performance (opcional) */}
        <Script id="performance-metrics" strategy="lazyOnload">
          {`
            // Monitorar métricas de performance
            if ('PerformanceObserver' in window) {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  if (entry.entryType === 'largest-contentful-paint') {
                    console.log('LCP:', entry.startTime);
                    // Enviar para analytics se necessário
                  }
                }
              });
              observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
            }
            
            // Otimização de scroll suave
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                  window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}