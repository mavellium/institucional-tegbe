"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- TIPAGEM ---
type ServiceFlowVariant = 'home' | 'ecommerce' | 'marketing' | 'sobre';

interface ServiceFlowProps {
  variant?: ServiceFlowVariant; // Default: 'home'
}

// --- CONFIGURAÇÃO DE CORES (THEME) ---
const themeConfig = {
  home: {
    background: "bg-[#f4f4f4]",
    text: {
      primary: "text-black",
      secondary: "text-gray-500",
      card: "text-gray-600",
      title: "text-black"
    },
    card: {
      background: "bg-white",
      border: "border-gray-200/50",
      hover: "hover:shadow-xl hover:border-gray-300",
      wideBackground: "bg-white"
    },
    accent: "#FFD700",
    badge: {
      background: "bg-gray-50",
      color: "#0071E3"
    }
  },
  ecommerce: {
    background: "bg-[#F4F4F4]",
    text: {
      primary: "text-black",
      secondary: "text-gray-600",
      card: "text-gray-600",
      title: "text-[#0071E3]"
    },
    card: {
      background: "bg-white",
      border: "border-gray-200",
      hover: "hover:shadow-lg hover:border-[#0071E3]/30",
      wideBackground: "bg-white"
    },
    accent: "#0071E3",
    badge: {
      background: "bg-[#0071E3]/10",
      color: "#0071E3"
    }
  },
  marketing: {
    background: "bg-[#020202] border-t border-white/5",
    text: {
      primary: "text-white",
      secondary: "text-gray-400",
      card: "text-gray-400",
      title: "text-white"
    },
    card: {
      background: "bg-[#0A0A0A]",
      border: "border-white/10",
      hover: "hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(227,27,99,0.1)]",
      wideBackground: "bg-[#0A0A0A]"
    },
    accent: "#E31B63",
    badge: {
      background: "bg-white/5 border border-white/10",
      color: "#E31B63"
    }
  },
  sobre: {
    background: "bg-[#F5F5F7]",
    text: {
      primary: "text-[#1d1d1f]",
      secondary: "text-gray-500",
      card: "text-gray-500",
      title: "text-[#1d1d1f]"
    },
    card: {
      background: "bg-white",
      border: "border-white",
      hover: "hover:border-[#0071E3]/20 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]",
      wideBackground: "bg-white"
    },
    accent: "#0071E3",
    badge: {
      background: "bg-[#F5F5F7] text-[#1d1d1f]",
      color: "#0071E3"
    }
  }
};

// --- CONFIGURAÇÃO DE CONTEÚDO ---
const contentConfig = {
  home: {
    header: {
      preTitle: "",
      title: "Como fazemos você vender",
      subtitle: "Metodologia validada em mais de R$ 40 milhões faturados."
    },
    services: [
      {
        step: "01",
        id: "seo",
        title: "SEO de Conversão",
        description: "Não criamos apenas anúncios, criamos máquinas de vendas. Títulos e descrições otimizados para que o cliente te encontre e compre sem hesitar.",
        icon: "lucide:search-code",
        color: "#0071E3",
        wide: false,
        visualType: "graph"
      },
      {
        step: "02",
        id: "ads",
        title: "Tráfego que Dá Lucro",
        description: "Gestão de Ads focada em ROI. Colocamos seu investimento onde o retorno é certo, acelerando o giro de estoque e multiplicando suas vendas.",
        icon: "lucide:trending-up",
        color: "#0071E3",
        wide: false,
        visualType: "graph"
      },
      {
        step: "03",
        id: "blindagem",
        title: "Operação Blindada",
        description: "Cuidamos da sua reputação para que nada pare o seu crescimento. No Mercado Livre e na Shopee, medalha no peito é sinônimo de mais dinheiro no bolso.",
        icon: "lucide:shield-check",
        color: "#FFD700",
        wide: true,
        visualType: "medal"
      }
    ]
  },
  marketing: {
    header: {
      preTitle: "O Padrão Tegbe",
      title: "Não é mágica.<br />É Metodologia.",
      gradientTitle: "Não é mágica.<br /><span class='text-transparent bg-clip-text bg-gradient-to-r from-[#FF0F43] to-[#A30030]'>É Metodologia.</span>",
      subtitle: "O tripé estratégico que sustenta operações de alta performance."
    },
    services: [
      {
        step: "01",
        id: "traffic",
        title: "Tráfego de Elite",
        description: "Não buscamos cliques, buscamos decisores. Segmentação cirúrgica para atrair quem pode pagar.",
        icon: "mdi:target-account",
        color: "#FF0F43",
        wide: false,
        visualType: "traffic"
      },
      {
        step: "02",
        id: "crm",
        title: "Engenharia de CRM",
        description: "Implementação oficial Kommo. Transformamos seu funil em uma linha de produção previsível.",
        icon: "mdi:sitemap",
        color: "#E31B63",
        wide: false,
        visualType: "crm"
      },
      {
        step: "03",
        id: "scale",
        title: "IA & Otimização",
        description: "Automação que trabalha enquanto você dorme. Dashboards de receita em tempo real e atendimento via IA.",
        icon: "mdi:robot-industrial",
        color: "#D90429",
        wide: true,
        visualType: "scale"
      }
    ]
  },
  sobre: {
    header: {
      preTitle: "Nosso Modus Operandi",
      title: "A engenharia por trás<br/>da nossa excelência.",
      subtitle: "",
      gradientTitle: ""
    },
    services: [
      {
        step: "01",
        id: "tracking",
        title: "Rastreabilidade Total",
        description: "Eliminamos a intuição. Antes de gastar R$ 1, implementamos um ecossistema de rastreamento (GA4 + Server Side). Se o dado não existe, a decisão não é tomada.",
        icon: "ph:chart-bar-bold",
        color: "#0071E3",
        wide: false,
        visualType: "bar-chart"
      },
      {
        step: "02",
        id: "efficiency",
        title: "Eficiência de Capital",
        description: "Não buscamos apenas cliques; buscamos margem. Nossa engenharia foca em fazer o estoque girar e transformar visitantes em fluxo de caixa líquido.",
        icon: "ph:rocket-launch-bold",
        color: "#0071E3",
        wide: false,
        visualType: "trend-line"
      },
      {
        step: "03",
        id: "governance",
        title: "Governança Radical",
        description: "Fim das caixas pretas. Você acessa o mesmo dashboard que nós. Tratamos seu budget com a seriedade e a transparência de um fundo de investimento.",
        icon: "ph:shield-check-bold",
        color: "#1d1d1f",
        wide: true,
        visualType: "dashboard"
      }
    ]
  }
};

// --- COMPONENTE ECOMMERCE SEPARADO ---
const CertifiedSection = () => {
  const container = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
    .from(cardRef.current, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    }, "-=0.8")
    .from(".badge-float", {
      scale: 0,
      rotation: -45,
      stagger: 0.2,
      duration: 0.8,
      ease: "back.out(1.7)",
    }, "-=0.5");
  }, { scope: container });

  return (
    <section 
      ref={container} 
      className="relative px-4 sm:px-8 py-32 bg-[#F4F4F4] overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-50">
        <div className="absolute top-24 left-10 w-64 h-64 bg-yellow-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-24 right-10 w-64 h-64 bg-blue-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-7xl mx-auto items-center">
        <div 
          ref={imageRef}
          className="relative w-full lg:w-1/2 group"
        >
          <div className="relative z-10 w-full aspect-[4/5] max-w-[500px] mx-auto rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <Image
              src="/consultor-foto.png"
              alt="Consultoria Certificada"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="badge-float absolute -bottom-6 -right-6 md:right-0 z-20 w-32 h-32 md:w-44 md:h-44 bg-white p-4 rounded-full shadow-2xl flex items-center justify-center border-4 border-[#0071E3]">
             <Image 
                src="/selo-ml-oficial.png" 
                width={120} 
                height={120} 
                alt="Selo Mercado Livre" 
                className="animate-pulse-slow"
             />
          </div>
        </div>

        <div 
          ref={cardRef}
          className="w-full lg:w-1/2 flex flex-col gap-8"
        >
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-[#0071E3]/10 text-[#0071E3] font-bold text-xs tracking-widest uppercase rounded-full">
              Parceria Estratégica
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-black leading-[1.1] tracking-tight">
              O selo que <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071E3] to-[#00a2ff]">
                destrava o seu lucro.
              </span>
            </h2>
          </div>

          <div className="space-y-6 max-w-lg">
            <p className="text-gray-600 text-xl leading-relaxed">
              Não somos apenas mais uma agência. Somos uma <strong>Consultoria Oficial Certificada</strong> pelo Mercado Livre.
            </p>
            <p className="text-gray-500 text-lg">
              Isso significa que a Tegbe joga com as cartas do dono da mesa. Acesso a dados antecipados e suporte premium para garantir que sua conta não apenas sobreviva, mas <strong>domine o marketplace.</strong>
            </p>
          </div>

          <div className="pt-4">
            <a
              aria-label="Descubra o poder do selo"
              href="/consultoria" 
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-black text-white font-bold rounded-full overflow-hidden transition-all hover:pr-14"
            >
              <span className="relative z-10">DESCUBRA O PODER DO SELO</span>
              <Icon 
                icon="mdi:arrow-right" 
                className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300" 
                width="24"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0071E3] to-[#00a2ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function ServiceFlow({ variant = 'home' }: ServiceFlowProps) {
  // Se for ecommerce, renderiza o componente específico
  if (variant === 'ecommerce') {
    return <CertifiedSection />;
  }

  const theme = themeConfig[variant];
  const content = contentConfig[variant];
  const containerRef = useRef(null);

  // Animação GSAP para grid
  useGSAP(() => {
    gsap.from(".section-title", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      },
    });

    gsap.from(".service-card", {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

  }, { scope: containerRef });

  // Função para renderizar visual específico
  const renderVisual = (service: any) => {
    switch (variant) {
      case 'home':
        return (
          <div className="mt-8 h-32 w-full rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-widest">
            {service.wide ? '🏆 [Área da Medalha 3D]' : '📈 [Gráfico de Performance]'}
          </div>
        );

      case 'marketing':
        if (service.id === 'traffic') {
          return (
            <div className="flex gap-2 items-end h-16 w-32 pb-4 opacity-50 group-hover:opacity-100 transition-opacity">
              <div className="w-4 h-8 bg-gray-800 rounded-t-sm animate-pulse"></div>
              <div className="w-4 h-12 bg-gray-700 rounded-t-sm"></div>
              <div className="w-4 h-10 bg-gray-700 rounded-t-sm"></div>
              <div className="w-4 h-full bg-[#E31B63] rounded-t-sm shadow-[0_0_10px_#E31B63]"></div>
            </div>
          );
        } else if (service.id === 'crm') {
          return (
            <div className="relative w-full h-full p-4 flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#E31B63]"></div>
              </div>
              <div className="flex justify-between items-center px-4">
                <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5"></div>
                <div className="h-[1px] w-8 bg-gray-700"></div>
                <div className="w-8 h-8 rounded-full border border-[#E31B63] bg-[#E31B63]/20"></div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/20 via-transparent to-transparent group-hover:from-rose-600/20 transition-all duration-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon icon="mdi:finance" className="text-gray-700 w-16 h-16 group-hover:text-[#E31B63] transition-colors duration-500" />
              </div>
            </div>
          );
        }

      case 'sobre':
        if (service.visualType === "bar-chart") {
          return (
            <div className="absolute inset-0 flex items-end justify-center gap-3 pb-8 px-8">
              <div className="w-4 bg-gray-300 rounded-t-sm h-[30%] group-hover:bg-[#0071E3]/40 group-hover:h-[45%] transition-all duration-700 delay-75"></div>
              <div className="w-4 bg-gray-300 rounded-t-sm h-[50%] group-hover:bg-[#0071E3]/60 group-hover:h-[70%] transition-all duration-700 delay-100"></div>
              <div className="w-4 bg-gray-300 rounded-t-sm h-[40%] group-hover:bg-[#0071E3]/50 group-hover:h-[55%] transition-all duration-700 delay-150"></div>
              <div className="w-4 bg-[#0071E3] rounded-t-sm h-[70%] group-hover:h-[90%] shadow-lg shadow-blue-500/20 transition-all duration-700 delay-200"></div>
            </div>
          );
        } else if (service.visualType === "trend-line") {
          return (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full p-6 text-gray-300 group-hover:text-[#0071E3] transition-colors duration-500" viewBox="0 0 100 50" preserveAspectRatio="none">
                <path 
                  d="M0,50 Q25,45 50,25 T100,5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  className="drop-shadow-md"
                />
                <circle cx="100" cy="5" r="3" className="fill-[#0071E3] animate-pulse" />
              </svg>
            </div>
          );
        } else {
          return (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-2">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[80%] group-hover:w-[95%] transition-all duration-1000 ease-out"></div>
              </div>
              <div className="w-full flex justify-between text-[10px] text-gray-400 font-mono uppercase">
                <span>Investimento</span>
                <span className="text-green-600 font-bold">ROI Positivo</span>
              </div>
              <div className="mt-2 p-2 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center gap-2">
                <Icon icon="ph:check-circle-fill" className="text-green-500 w-4 h-4"/>
                <span className="text-xs font-bold text-gray-600">Acesso Liberado</span>
              </div>
            </div>
          );
        }

      default:
        return null;
    }
  };

  return (
    <section 
      ref={containerRef} 
      className={`relative py-24 px-6 overflow-hidden ${theme.background}`}
    >
      {/* Noise texture para marketing */}
      {variant === 'marketing' && (
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      )}

      {/* Background decorativo para sobre */}
      {variant === 'sobre' && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gray-200/40 rounded-full blur-[100px]" />
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* CABEÇALHO */}
        <div className={`mb-16 text-center section-title will-change-transform ${variant === 'marketing' ? 'mb-20' : ''}`}>
          {variant === 'marketing' && (
            <div className="inline-block mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{content.header.preTitle}</span>
            </div>
          )}

          {variant === 'sobre' && (
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0071E3]"></span>
              <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">{content.header.preTitle}</span>
            </div>
          )}

          <h2 
            className={`text-4xl md:text-5xl ${variant === 'marketing' ? 'lg:text-6xl' : 'lg:text-5xl'} font-bold tracking-tight mb-4 ${theme.text.title}`}
            dangerouslySetInnerHTML={{
              __html: variant === 'marketing' && 'gradientTitle' in content.header ? content.header.gradientTitle : content.header.title
            }}
          />

          {content.header.subtitle && (
            <p className={`text-lg max-w-2xl mx-auto ${theme.text.secondary} ${variant === 'sobre' ? 'hidden' : ''}`}>
              {content.header.subtitle}
            </p>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.services.map((service, index) => (
            <div 
              key={index}
              className={`
                service-card relative overflow-hidden rounded-[2rem] p-8 border group
                will-change-transform transition-all duration-500 hover:-translate-y-1
                ${service.wide ? 'md:col-span-2' : 'md:col-span-1'}
                ${theme.card.background} ${theme.card.border} ${theme.card.hover}
                ${variant === 'sobre' && service.wide ? 'md:flex md:items-center md:gap-10' : ''}
              `}
            >
              {/* Número de Fundo */}
              <span className={`
                absolute right-6 top-6 text-6xl font-black select-none
                ${variant === 'home' ? 'text-gray-100 group-hover:text-gray-50' : ''}
                ${variant === 'marketing' ? 'text-white/5 group-hover:text-white/10 text-7xl' : ''}
                ${variant === 'sobre' ? 'hidden' : ''}
              `}>
                {service.step}
              </span>

              <div className={`relative z-10 flex flex-col h-full justify-between ${variant === 'sobre' && service.wide ? 'md:w-1/2' : ''}`}>
                <div>
                  {/* Ícone */}
                  <div 
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm
                      transition-transform duration-500 group-hover:scale-110
                      ${variant === 'home' ? 'bg-gray-50' : ''}
                      ${variant === 'marketing' ? 'bg-white/5 border border-white/10 group-hover:bg-[#E31B63] group-hover:border-[#E31B63]' : ''}
                      ${variant === 'sobre' ? `${theme.badge.background} group-hover:bg-[#0071E3] group-hover:text-white` : ''}
                    `}
                    style={{ color: service.color }}
                  >
                    <Icon icon={service.icon} width="28" height="28" />
                  </div>

                  <h1 className={`text-2xl font-bold mb-3 w-11/12 md:w-3/4 ${theme.text.title}`}>
                    {service.title}
                  </h1>

                  <p className={`
                    leading-relaxed text-base
                    ${variant === 'home' ? 'text-gray-600 font-medium' : ''}
                    ${variant === 'marketing' ? 'text-gray-400 font-light border-l-2 border-white/10 pl-4' : ''}
                    ${variant === 'sobre' ? 'text-gray-500 font-medium' : ''}
                  `}>
                    {service.description}
                  </p>
                </div>

                {/* Área Visual */}
                <div className={`
                  mt-8 relative rounded-xl border overflow-hidden
                  group-hover:border-${variant === 'marketing' ? 'rose-500/20' : 'blue-100'} transition-colors duration-500
                  ${variant === 'home' ? 'h-32 bg-gray-50 border-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold uppercase tracking-widest' : ''}
                  ${variant === 'marketing' ? 'h-32 bg-black/40 border-white/5 flex items-center justify-center' : ''}
                  ${variant === 'sobre' ? `${service.wide ? 'mt-0 md:w-1/2 h-full min-h-[160px]' : 'h-[140px]'} bg-[#F5F5F7] border-gray-100` : ''}
                `}>
                  {renderVisual(service)}
                </div>
              </div>

              {/* Borda Inferior Animada */}
              <div 
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundColor: service.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}