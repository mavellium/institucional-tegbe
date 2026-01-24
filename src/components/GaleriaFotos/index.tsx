"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Icon } from "@iconify/react";

// --- TIPAGEM ---
export interface GalleryItem {
  id: string;
  alt: string;
  image: string;
  span: string;
}

interface TextContent {
  cta?: {
    button?: string;
    cardTitle?: string;
    cardDescription?: string;
  };
  badge?: {
    icon?: string;
    text?: string;
  };
  title?: {
    line1?: string;
    line2?: string;
    highlightWords?: string;
  };
  description?: string;
}

interface GaleriaFotosProps {
  data: {
    data?: GalleryItem[];
    textContent?: TextContent;
  } | null | any;
}

export default function GaleriaFotos({ 
  data
}: GaleriaFotosProps) {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Parallax suave ao rolar a página
  const { scrollYProgress } = useScroll({
    target: isClient ? containerRef : undefined,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Função para aplicar gradiente às palavras destacadas
  const renderHighlightedText = (text: string, wordsToHighlight: string) => {
    if (!text || !wordsToHighlight) return text;
    
    const wordsArray = wordsToHighlight.split(',').map(word => word.trim());
    const regex = new RegExp(`(${wordsArray.join('|')})`, 'gi');
    
    return text.split(regex).map((part, index) => {
      if (wordsArray.some(word => part.toLowerCase() === word.toLowerCase())) {
        return (
          <span 
            key={index} 
            className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBB46C] via-[#FFD700] to-[#B8860B]"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Durante SSR, retorna um placeholder vazio
  if (!isClient) {
    return (
      <section className="py-24 bg-[#020202] relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 min-h-[800px]">
            {/* Placeholder durante SSR */}
          </div>
        </div>
      </section>
    );
  }

  // CORREÇÃO CRÍTICA: Processar os dados de forma segura
  const processData = (data: any): { images: GalleryItem[], texts: TextContent } => {
    // Valores padrão
    const result = {
      images: [] as GalleryItem[],
      texts: {} as TextContent
    };
    
    if (!data) return result;
    
    // Processar imagens
    if (data.data && Array.isArray(data.data)) {
      result.images = data.data.map((item: any) => ({
        id: item.id || '',
        alt: item.alt || '',
        image: item.image || '',
        span: item.span || 'row-span-1'
      })).filter((item: any) => item.image); // Filtrar itens sem imagem
    }
    
    // Processar textos
    if (data.textContent) {
      result.texts = data.textContent;
    }
    
    console.log('Dados processados:', {
      quantidadeImagens: result.images.length,
      textos: result.texts
    });
    
    return result;
  };

  // Processar os dados
  const { images, texts } = processData(data);
  
  // Extrair textos para facilitar o uso
  const badgeText = texts?.badge?.text;
  const badgeIcon = texts?.badge?.icon;
  const titleLine1 = texts?.title?.line1;
  const titleLine2 = texts?.title?.line2;
  const highlightWords = texts?.title?.highlightWords;
  const description = texts?.description;
  const ctaButtonText = texts?.cta?.button;
  const ctaCardTitle = texts?.cta?.cardTitle;
  const ctaCardDescription = texts?.cta?.cardDescription;
  
  // Se não houver imagens após processamento, não renderiza
  if (!images || images.length === 0) {
    console.log('GaleriaFotos: Nenhuma imagem encontrada:', data);
    return null;
  }

  // Se não houver textos, não renderiza a seção de header
  const hasHeaderContent = badgeText || titleLine1 || titleLine2 || description;

  // Usar slice com segurança
  const col1 = images.slice(0, 3);
  const col2 = images.slice(3, 6);
  const col3 = images.slice(6, 9);

  return (
    <section ref={containerRef} className="py-24 bg-[#020202] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        
        {/* HEADER DINÂMICO - SOMENTE SE HOUVER CONTEÚDO */}
        {hasHeaderContent && (
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
            {badgeText && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md mb-6">
                <Icon icon={badgeIcon || "ph:users-three-fill"} className="text-[#FFD700] w-4 h-4" />
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                  {badgeText}
                </span>
              </div>
            )}
            
            {(titleLine1 || titleLine2) && (
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                {titleLine1 && <>{titleLine1} <br/></>}
                {titleLine2 && renderHighlightedText(titleLine2, highlightWords || '')}
              </h2>
            )}
            
            {description && (
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}

        {/* MASONRY GRID - SEMPRE RENDERIZA SE HOUVER IMAGENS */}
        <div className="grid grid-cols-2 md:grid-cols-3 p-30 gap-4 md:gap-6 min-h-[800px] overflow-hidden mask-gradient-b">
            
            {/* COLUNA 1 */}
            <motion.div style={{ y: y1 }} className="flex flex-col gap-4 md:gap-6">
                {col1.map((img) => (
                    <div key={img.id} className={`relative rounded-2xl overflow-hidden group border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 ${img.span === 'row-span-2' ? 'h-[400px]' : 'h-[250px]'}`}>
                        <img src={img.image} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{img.alt}</span>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* COLUNA 2 */}
            <motion.div style={{ y: y2 }} className="flex flex-col gap-4 md:gap-6 pt-12 md:pt-24">
                {col2.map((img) => (
                    <div key={img.id} className={`relative rounded-2xl overflow-hidden group border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 ${img.span === 'row-span-2' ? 'h-[450px]' : 'h-[300px]'}`}>
                        <img src={img.image} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                             <span className="text-xs font-bold text-white uppercase tracking-wider">{img.alt}</span>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* COLUNA 3 */}
            <motion.div style={{ y: y3 }} className="hidden md:flex flex-col gap-4 md:gap-6">
                {col3.map((img) => (
                    <div key={img.id} className={`relative rounded-2xl overflow-hidden group border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 ${img.span === 'row-span-3' ? 'h-[500px]' : 'h-[350px]'}`}>
                        <img src={img.image} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                             <span className="text-xs font-bold text-white uppercase tracking-wider">{img.alt}</span>
                        </div>
                    </div>
                ))}
                 
                 {/* Card Extra de CTA dinâmico - SOMENTE SE HOUVER TEXTO */}
                 {(ctaCardTitle || ctaCardDescription) && (
                   <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#FFD700]/20 flex flex-col items-center justify-center p-6 text-center h-[300px] group cursor-pointer hover:bg-[#FFD700]/5 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Icon icon="ph:plus-bold" className="text-[#FFD700] w-6 h-6" />
                      </div>
                      {ctaCardTitle && <h3 className="text-white font-bold text-lg mb-2">{ctaCardTitle}</h3>}
                      {ctaCardDescription && <p className="text-gray-500 text-xs">{ctaCardDescription}</p>}
                   </div>
                 )}
            </motion.div>

        </div>
        
        {/* Fade Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none z-20"></div>

        {/* CTA Button dinâmico - SOMENTE SE HOUVER TEXTO */}
        {ctaButtonText && (
          <div className="relative z-30 flex justify-center -mt-10">
               <button className="px-8 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-white text-sm font-bold hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all duration-300">
                  {ctaButtonText}
               </button>
          </div>
        )}

      </div>
    </section>
  );
}