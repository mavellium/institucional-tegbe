"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Icon } from "@iconify/react";

// --- TIPAGEM ---
export interface GalleryItem {
  id: string;
  alt: string;
  image: string; // API retorna 'image'
  span: string;  // API retorna 'row-span-1' ou 'row-span-2'
}

interface GaleriaFotosProps {
  data: GalleryItem[] | null;
}

export default function GaleriaFotos({ data }: GaleriaFotosProps) {
  const containerRef = useRef(null);
  
  // Parallax suave ao rolar a página
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]); // Coluna 1 sobe
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);  // Coluna 2 sobe menos
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]); // Coluna 3 sobe mais

  if (!data || data.length === 0) return null;

  // Distribuindo os dados nas colunas (Lógica simples de fatiamento)
  // Ajuste os índices conforme a quantidade de fotos que você cadastrar no CMS
  const col1 = data.slice(0, 3);
  const col2 = data.slice(3, 6);
  const col3 = data.slice(6, 9); // Restante vai para coluna 3

  return (
    <section ref={containerRef} className="py-24 bg-[#020202] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/20 bg-[#FFD700]/5 backdrop-blur-md mb-6">
              <Icon icon="ph:users-three-fill" className="text-[#FFD700] w-4 h-4" />
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#FFD700] uppercase">
                Comunidade Elite
              </span>
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
             Você nunca vai <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DBB46C] via-[#FFD700] to-[#B8860B]">jogar sozinho.</span>
           </h2>
           <p className="text-gray-400 text-lg font-light leading-relaxed">
             Entre para o ecossistema onde networking não é troca de cartão, é troca de estratégia de escala.
           </p>
        </div>

        {/* MASONRY GRID (Com Parallax nas colunas para desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 min-h-[800px] overflow-hidden mask-gradient-b">
            
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

            {/* COLUNA 2 (Deslocada para efeito masonry) */}
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

            {/* COLUNA 3 (Apenas Desktop) */}
            <motion.div style={{ y: y3 }} className="hidden md:flex flex-col gap-4 md:gap-6">
                {col3.map((img) => (
                    <div key={img.id} className={`relative rounded-2xl overflow-hidden group border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 ${img.span === 'row-span-3' ? 'h-[500px]' : 'h-[350px]'}`}>
                        <img src={img.image} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                             <span className="text-xs font-bold text-white uppercase tracking-wider">{img.alt}</span>
                        </div>
                    </div>
                ))}
                 
                 {/* Card Extra de CTA dentro do Grid */}
                 <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#FFD700]/20 flex flex-col items-center justify-center p-6 text-center h-[300px] group cursor-pointer hover:bg-[#FFD700]/5 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon icon="ph:plus-bold" className="text-[#FFD700] w-6 h-6" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Sua foto aqui</h3>
                    <p className="text-gray-500 text-xs">Junte-se aos próximos cases de sucesso da Tegbe.</p>
                 </div>
            </motion.div>

        </div>
        
        {/* Fade Bottom para suavizar o corte */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020202] to-transparent pointer-events-none z-20"></div>

        {/* CTA Button */}
        <div className="relative z-30 flex justify-center -mt-10">
             <button className="px-8 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-white text-sm font-bold hover:bg-[#FFD700] hover:text-black hover:border-[#FFD700] transition-all duration-300">
                Ver Galeria Completa no Instagram
             </button>
        </div>

      </div>
    </section>
  );
}