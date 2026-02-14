"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// --- INTERFACES PARA TIPAGEM ---
interface ServiceTheme {
  bg: string;
  btn: string;
  color: string;
  border: string;
}

interface Service {
  id: string;
  number: string;
  title: string;
  verticalTitle: string;
  icon: string;
  image: string; // Pode ser blob:https... ou https://...
  description: string;
  buttonText: string;
  href: string;
  theme: ServiceTheme;
}

interface RouterData {
  header: {
    label: string;
    title: string;
    desc: string;
  };
  services: Service[];
  animation_config?: {
    mass: number;
    damping: number;
    stiffness: number;
  };
}

export default function ServiceRouterWhite() {
  const [data, setData] = useState<RouterData | null>(null);
  const [activeId, setActiveId] = useState<string>("ecommerce");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api-tegbe/tegbe-institucional/solucoes');
        const result = await response.json();
        
        if (result.service_router) {
          setData(result.service_router);
          if (result.service_router.services?.length > 0) {
            setActiveId(result.service_router.services[0].id);
          }
        }
      } catch (error) {
        console.error("Erro API:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getColorHex = (twClass: string) => {
    const color = twClass.toLowerCase();
    if (color.includes('#')) return color.match(/#[a-f0-9]{3,6}/i)?.[0] || '#EAB308';
    if (color.includes('amber')) return '#F59E0B';
    if (color.includes('ec4899') || color.includes('pink')) return '#EC4899';
    return '#EAB308';
  };

  if (loading || !data) return null;

  const springConfig = data.animation_config || { mass: 1, damping: 25, stiffness: 100 };

  return (
    <section id="solucoes" className="py-32 px-6 bg-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">
               {data.header.label}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight leading-[0.95]">
              {data.header.title}
            </h2>
          </div>
          <p className="text-gray-500 text-lg md:max-w-sm leading-relaxed">
            {data.header.desc}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-[700px] lg:h-[600px] w-full">
          {data.services.map((service) => {
            const isActive = activeId === service.id;
            const themeColor = getColorHex(service.theme.color);

            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveId(service.id)}
                transition={{ type: "spring", ...springConfig }}
                className={`
                  relative rounded-[2rem] overflow-hidden cursor-pointer border transition-all duration-500
                  ${isActive ? `shadow-2xl shadow-gray-200/50 bg-white` : 'border-gray-100 bg-gray-50'}
                `}
                style={{
                  flex: isActive ? 3 : 1,
                  borderColor: isActive ? themeColor : '#f3f4f6' 
                }}
              >
                {/* AQUI ESTÁ A CORREÇÃO: 
                   Usamos tag <img> nativa para aceitar o blob da API 
                */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 0.15 : 0 }} 
                        transition={{ duration: 0.5 }}
                        className="w-full h-full"
                    >
                        <img 
                            src={service.image}
                            alt=""
                            className="w-full h-full object-cover grayscale brightness-110"
                        />
                    </motion.div>
                </div>

                <div className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <motion.div 
                      layout="position"
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500"
                      style={{ 
                        backgroundColor: isActive ? themeColor : 'white',
                        color: isActive ? 'white' : '#9ca3af',
                        borderColor: isActive ? 'transparent' : '#e5e7eb'
                      }}
                    >
                      <Icon icon={service.icon} className="w-7 h-7" />
                    </motion.div>
                    <span className="text-xl font-mono font-bold" style={{ color: isActive ? themeColor : '#d1d5db' }}>
                      {service.number}
                    </span>
                  </div>

                  <div className="flex-1 flex items-center">
                    <AnimatePresence mode="popLayout">
                      {isActive ? (
                        <motion.div 
                          key="active-content"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="max-w-lg"
                        >
                          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                            {service.title}
                          </h3>
                          <p className="text-gray-500 text-lg leading-relaxed mb-8">
                            {service.description}
                          </p>
                          <Link href={service.href}>
                            <button 
                              className="group flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-bold uppercase tracking-wider text-sm transition-all"
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = themeColor}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#111827'}
                            >
                                {service.buttonText}
                                <Icon icon="solar:arrow-right-linear" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </Link>
                        </motion.div>
                      ) : (
                        <motion.div key="inactive-content" className="absolute inset-0 flex items-center justify-center">
                           <h3 className="hidden lg:block text-4xl font-bold text-gray-300 tracking-widest uppercase -rotate-90 whitespace-nowrap select-none">
                              {service.verticalTitle}
                           </h3>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden mt-auto">
                     <motion.div 
                        className="h-full"
                        style={{ backgroundColor: themeColor }}
                        initial={{ width: 0 }}
                        animate={{ width: isActive ? "100%" : "0%" }}
                        transition={{ duration: 0.6 }}
                     />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}