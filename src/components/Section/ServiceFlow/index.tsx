"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ServiceFlowProps, VariantContent, Service, ServiceFlowVariant } from './types';
import { THEMES } from './constants/themes';
import ServiceHeader from './ServiceHeader';
import ServiceCard from './ServiceCard';
import { Icon } from '@iconify/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Flywheel from "../../ui/Flywheel";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ExtendedService extends Service {
  flywheel?: boolean;
}

const FALLBACK_CONTENT: Record<ServiceFlowVariant, VariantContent> = {
  home: {
    header: {
      title: "Soluções para",
      badge: "Crescimento Exponencial",
      highlighted: "Vender Mais",
      description: "Estratégias validadas pela Tegbe para escalar seu faturamento no digital.",
      preTitle: "", subtitle: ""
    },
    services: [
      { step: "01", id: "consultoria", title: "Consultoria de Vendas", description: "Otimizamos seu funil para converter cada centavo investido em lucro.", icon: "mdi:strategy", color: "blue", wide: false, visualType: "default" },
      { step: "02", id: "marketing", title: "Marketing de Performance", description: "Campanhas focadas em ROI para colocar seu produto na frente de quem compra.", icon: "mdi:bullhorn", color: "pink", wide: false, visualType: "default" }
    ],
    cta: { text: "Quero Vender Mais", url: "https://api.whatsapp.com/send?phone=5514991779502", description: "Tecnologia que gera lucro real." }
  },
  marketing: {
    header: {
      title: "Acelere suas",
      badge: "Vendas Inteligentes",
      highlighted: "Conversões",
      description: "Transforme sua marca em uma máquina de vendas com a metodologia Tegbe.",
      preTitle: "", subtitle: ""
    },
    services: [],
    cta: { text: "Escalar meu Negócio", url: "https://api.whatsapp.com/send?phone=5514991779502", description: "Venda mais com automação e estratégia." },
    stats: [{ value: '3x', label: 'Mais Vendas' }, { value: '47%', label: 'Conversão' }, { value: '2.5x', label: 'ROI' }],
  },
  sobre: {
    header: { title: "Nossa Missão", badge: "Sobre a Tegbe", highlighted: "Seu Sucesso", description: "Somos especialistas em fazer negócios venderem mais através da inovação.", preTitle: "", subtitle: "" },
    services: [],
    cta: { text: "Conhecer Estratégia", url: "https://api.whatsapp.com/send?phone=5514991779502", description: "Parceria focada em resultados." }
  },
  ecommerce: {
    header: { title: "Lojas que Vendem", badge: "E-commerce", highlighted: "Faturamento Alto", description: "Sua loja virtual construída para bater recordes de vendas.", preTitle: "", subtitle: "" },
    services: [],
    cta: { text: "Quero Minha Loja", url: "https://api.whatsapp.com/send?phone=5514991779502", description: "Venda online com quem entende de lucro." }
  }
};

export default function ServiceFlow({ variant = 'home' }: ServiceFlowProps) {
  const [content, setContent] = useState<VariantContent | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = THEMES[variant as ServiceFlowVariant] || THEMES.home;

  useEffect(() => {
    const loadApiContent = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api-tegbe/tegbe-institucional/cards');
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const allVariants = await response.json();
        setContent(allVariants[variant] || FALLBACK_CONTENT[variant]);
      } catch (error) {
        setContent(FALLBACK_CONTENT[variant]);
      } finally {
        setLoading(false);
      }
    };
    loadApiContent();
  }, [variant]);

  useGSAP(() => {
    // Evita rodar animação se não houver conteúdo ou se for marketing (que tem layout próprio)
    if (loading || !content || !containerRef.current || variant === 'marketing') return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(".section-title", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
        .fromTo(".service-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.15 }, "-=0.5")
        .fromTo(".cta-element", { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=0.3");
    }, containerRef);

    return () => ctx.revert();
  }, [loading, content, variant]);

  // Renderização de Segurança para o erro de inserção de nó
  if (variant === 'ecommerce' && !loading) return <div className="hidden" />;

  return (
    <div ref={containerRef} className="w-full">
      {loading || !content ? (
        <div className={`py-24 flex items-center justify-center ${theme.background}`}>
          {variant === 'marketing' ? <Flywheel /> : <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />}
        </div>
      ) : variant === 'marketing' ? (
        /* Layout Marketing */
        <section className="relative min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center py-24 px-6">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
          <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Sparkles className="w-4 h-4 text-[#E31B63]" />
                <span className="text-xs text-gray-200 font-bold uppercase">{content.header.badge}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
                {content.header.title}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#E31B63]">
                  {content.header.highlighted}.
                </span>
              </h1>
              <p className="text-lg text-gray-400 max-w-lg">{content.header.description}</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-12 pt-4">
                {content.stats?.map((stat, i) => (
                  <div key={i}>
                    <div className="text-4xl font-black text-white">{stat.value}</div>
                    <div className="text-[10px] text-[#E31B63] uppercase font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <Link href={content.cta?.url || "#"} className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF0F43] to-[#E31B63] text-white px-10 py-5 rounded-full font-black text-sm uppercase hover:scale-105 transition-transform">
                  {content.cta?.text} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#E31B63]/20 blur-[100px] rounded-full animate-pulse" />
              <Flywheel />
            </div>
          </div>
        </section>
      ) : (
        /* Layout Padrão (Home, Sobre, etc) */
        <section className={`relative py-24 overflow-hidden ${theme.background}`}>
          <div className="max-w-6xl mx-auto relative z-10">
            <ServiceHeader content={content.header} theme={theme} variant={variant} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.services?.map((service, index) => (
                <div key={service.id || index} className={service.wide ? "md:col-span-2" : "col-span-1"}>
                  <ServiceCard service={service} theme={theme} variant={variant} />
                </div>
              ))}
            </div>
            {content.cta && (
              <div className="cta-element flex flex-col items-center mt-12">
                <Link href={content.cta.url} target="_blank" className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold bg-black text-white hover:scale-105 transition-all">
                  <span>{content.cta.text}</span>
                  <Icon icon="lucide:arrow-right" className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="mt-4 text-[10px] font-medium tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {content.cta.description}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}