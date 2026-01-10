'use client'

import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Step {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    description: string;
}

export default function SellMore() {
    const [steps, setSteps] = useState<Step[]>([]);
    const [activeStep, setActiveStep] = useState<Step | null>(null);
    const [loading, setLoading] = useState(true);

    const sectionRef = useRef<HTMLDivElement>(null)
    const leftColumnRef = useRef<HTMLDivElement>(null)
    const rightColumnRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const stepButtonsRef = useRef<(HTMLButtonElement | null)[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api-tegbe/tegbe-institucional/form/venda-mais-ecommerce');
                const result = await response.json();
                
                if (result.values) {
                    setSteps(result.values);
                    setActiveStep(result.values[0]);
                }
            } catch (error) {
                console.error("ERRO DE CONEXÃO API:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useGSAP(() => {
        if (loading || steps.length === 0 || !sectionRef.current) return;

        ScrollTrigger.refresh();

        gsap.set([leftColumnRef.current, rightColumnRef.current], { opacity: 0, y: 50 });

        gsap.to(leftColumnRef.current, {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        });

        gsap.to(rightColumnRef.current, {
            opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        });

        stepButtonsRef.current.forEach((button, index) => {
            if (!button) return;
            gsap.set(button, { opacity: 0, x: -30, scale: index === 0 ? 1.02 : 1 });
            gsap.to(button, {
                opacity: 1, x: 0, duration: 0.6, delay: 0.1 * index, ease: "back.out(1.2)",
                scrollTrigger: { trigger: leftColumnRef.current, start: "top 80%" }
            });
        });
    }, { dependencies: [loading, steps], scope: sectionRef });

    const handleStepChange = (step: Step) => {
        if (!activeStep || step.id === activeStep.id) return;
        
        const prevIndex = steps.findIndex(s => s.id === activeStep.id);
        const nextIndex = steps.findIndex(s => s.id === step.id);

        gsap.to([imageRef.current, titleRef.current, descriptionRef.current], {
            opacity: 0, y: 20, duration: 0.3, ease: "power2.in",
            onComplete: () => {
                if (stepButtonsRef.current[prevIndex]) {
                    gsap.to(stepButtonsRef.current[prevIndex], { scale: 1, duration: 0.3 });
                }
                setActiveStep(step);
                if (stepButtonsRef.current[nextIndex]) {
                    gsap.to(stepButtonsRef.current[nextIndex], { scale: 1.02, duration: 0.4, ease: "back.out(1.7)" });
                }
                setTimeout(() => {
                    gsap.set([imageRef.current, titleRef.current, descriptionRef.current], { opacity: 0, y: -20 });
                    const tl = gsap.timeline();
                    tl.to(imageRef.current, { opacity: 1, y: 0, duration: 0.5 });
                    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.3");
                    tl.to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
                }, 50);
            }
        });
    };

    if (loading || !activeStep) return null;

    return (
        <section ref={sectionRef} className="w-full max-w-7xl px-4 mx-auto my-12 bg-[#F4F4F4]">
            <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                <div ref={leftColumnRef} className="w-full lg:w-1/2">
                    <p className="text-black font-bold mb-2">Venda mais</p>
                    <h1 className="font-bold text-2xl md:text-4xl mb-8 text-black leading-tight">
                        Onde muitos veem dificuldade, nossos parceiros encontram lucro.
                    </h1>

                    <div className="flex flex-col gap-4">
                        {steps.map((step, index) => (
                            <button
                                key={step.id}
                                ref={(el) => { stepButtonsRef.current[index] = el }}
                                onClick={() => handleStepChange(step)}
                                className={`text-left p-5 rounded-xl border transition-all duration-300
                                ${activeStep.id === step.id ? 'bg-white border-blue-500 shadow-lg' : 'bg-transparent border-gray-200'}
                                `}
                            >
                                <h1 className="font-bold text-base text-black">{step.title}</h1>
                                <p className="text-sm text-gray-600">{step.subtitle}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div ref={rightColumnRef} className="w-full lg:w-1/2 flex flex-col items-center text-center">
                    <div className="relative w-full max-w-[520px] h-[350px] mb-6">
                        <Image
                            ref={imageRef}
                            fill
                            src={activeStep.image}
                            className="absolute inset-0 w-full h-full object-contain"
                            alt={activeStep.title}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    </div>
                    <h2 ref={titleRef} className="font-bold text-xl sm:text-2xl mb-3 text-black">{activeStep.subtitle}</h2>
                    <p ref={descriptionRef} className="text-gray-700 max-w-md">{activeStep.description}</p>
                </div>
            </div>
        </section>
    );
}