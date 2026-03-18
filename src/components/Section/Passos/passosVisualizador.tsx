import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Passos } from '@/interface/passos/IPassos';
import Heading from '@/components/ui/heading';
import Paragrafo from '@/components/ui/paragrafo';
import { useEffect } from 'react';

interface StepVisualizerProps {
    activeStep: Passos;
    containerRef: React.RefObject<HTMLDivElement | null>;
    imageContainerRef: React.RefObject<HTMLDivElement | null>;
    onImageLoad: () => void;
}

export function StepVisualizer({
    activeStep,
    containerRef,
    imageContainerRef,
    onImageLoad
}: StepVisualizerProps) {

    useEffect(() => {
        const img = new window.Image();
        img.src = activeStep.image;
    }, [activeStep.image]);

    return (
        <div className="
  relative w-full max-w-xl 
  bg-white 
  rounded-[28px] 
  border border-slate-200/70
  shadow-[0_25px_80px_rgba(0,0,0,0.08)]
  p-8 md:p-12
  flex flex-col items-center text-center 
  overflow-hidden
">

            {/* Glow sutil pra dar nitidez */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px]
    bg-gradient-to-br from-yellow-100/40 via-transparent to-transparent opacity-60"
            />

            {/* Conteúdo */}
            <div className="relative z-10 w-full flex flex-col items-center">

                {/* Imagem */}
                <div
                    ref={imageContainerRef}
                    className="relative w-full h-[240px] md:h-[340px] mb-8 flex items-center justify-center"
                >
                    <AnimatePresence mode="sync">
                        <motion.div
                            key={`img-${activeStep.id}`}
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Image
                                src={activeStep.image}
                                fill
                                className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                                alt={activeStep.title}
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Texto */}
                <div className="relative w-full min-h-[160px] md:min-h-[180px] flex items-center justify-center">
                    <AnimatePresence initial={false}>
                        <motion.div
                            key={`text-${activeStep.id}`}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -25 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="absolute inset-0 flex flex-col items-center justify-center px-2"
                        >
                            <Heading
                                as='h2'
                                size='p'
                                className="text-3xl md:text-4xl mb-4 text-slate-900 tracking-tight font-semibold"
                                align='center'
                            >
                                {activeStep.subtitle}
                            </Heading>

                            {activeStep.description && (
                                <Paragrafo
                                    className='text-lg text-slate-600 leading-relaxed max-w-md'
                                    align='center'
                                >
                                    {activeStep.description}
                                </Paragrafo>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}