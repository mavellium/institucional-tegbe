"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CardFundador from "@/components/ui/cardFundador";
import ButtonLink from "../ui/buttonLink";
import Heading from "../ui/heading";
import RichText from "../ui/richText";
import Paragrafo from "../ui/paragrafo";
import Textura from "../ui/textura";

import { TargetVideo } from "@/app/types/target-button.types";
import { RichTextItem } from "@/types/richText.type";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Founder = {
  name: RichTextItem[];
  role: RichTextItem[];
  image: string;

  socials: {
    icon: string;
    link: string;
  }[];

  companies: {
    logo: string;
    name: string;
  }[];
};


type SobreData = {
  header: {
    title: RichTextItem[];
    subtitle: RichTextItem[][];
  };

  cta: {
    label: string;
    link: string;
    target?: TargetVideo;
  };

  founder: Founder;
};

const mockData: SobreData = {
  header: {
    title: [
      { type: "text", value: "Onde a parceria", },
      { type: "linebreak" },
      { type: "text", value: "constrói " },
      { type: "highlight", value: "resultado", color: "#FFC72C" }
    ],

    subtitle: [
      [
        {
          type: "text",
          value:
            "A Tegbe nasce em dezembro de 2022, em Garça (SP), com uma convicção inegociável: no e-commerce, ninguém escala o topo sozinho. Sob a visão de Donizete Caetano, surgimos para ser mais do que uma consultoria; nascemos para ser o parceiro estratégico que entra no jogo para vencer junto.",
        }
      ],
      [
        {
          type: "text",
          value:
            "Nossa fundação foi motivada por uma falha clara no mercado: empresas com excelente potencial, mas travadas por falta de um método prático. Percebemos que o empresário não precisava de mais relatórios teóricos, mas de um aliado que soubesse desenhar canais de vendas e, mais importante, soubesse como fazê-los funcionar no dia a dia."

        }
      ],
      [
        {
          type: "text",
          value:
            "Começamos no terreno fértil do Mercado Livre. Como consultoria certificada e agência de marketing digital, aprendemos a unir a inteligência estratégica à execução implacável."

        }
      ],
      [
        {
          type: "text",
          value:
            "Com o tempo, essa relação de confiança com nossos parceiros nos fez evoluir. Entendemos que o nosso papel é atuar como um braço de engenharia de vendas dentro do negócio, auxiliando no desenvolvimento de canais de forma estruturada. O que começou como um suporte operacional transformou-se em uma estrutura capaz de orientar decisões de alto nível, sustentar o crescimento e ampliar o impacto de quem faz o Brasil avançar."

        }
      ],
      [
        {
          type: "text",
          value:
            "Na Tegbe, a sua meta é a nossa bússola. Não entregamos apenas uma solução de vendas; entregamos a presença estratégica e a prática necessária para transformar cada canal em uma máquina de escala e lucro."

        }
      ]
    ]
  },

  cta: {
    label: "Conhecer o Método",
    link: "carreiras",
    target: "_blank"
  },

  founder: {
    name: [{ type: "text", value: "Donizete Caetano" }],
    role: [{ type: "text", value: "Fundador da Tegbe • Especialista em Escala" }],
    image: "/teste2.png",
    socials: [
      { icon: "ph:instagram-logo", link: "#" },
      { icon: "ph:linkedin-logo", link: "#" },
    ],
    companies: [
      { logo: "simple-icons:mercadopago", name: "Mercado Livre" },
      { logo: "simple-icons:amazon", name: "Amazon" },
      { logo: "simple-icons:shopee", name: "Shopee" },
    ],
  }
};

export function QuemSomos({
  endpoint = `${process.env.NEXT_PUBLIC_API_URL}/socios!`
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<SobreData>(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await fetch(endpoint);

        if (!res.ok) throw new Error("Erro API");

        const json = await res.json();

        if (json?.sobre) {
          setData(json.sobre);
        }

      } catch (error) {

        console.warn("Usando mockData:", error);

      } finally {

        setLoading(false);

      }
    };

    fetchData();
  }, [endpoint]);

  useGSAP(
    () => {

      if (loading) return;

      gsap.from(".animate-up", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        },
        y: 28,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out"
      });

    },
    { scope: containerRef, dependencies: [loading] }
  );

  if (loading) {
    return (
      <div className="h-[500px] bg-[#FAFAF8] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#F1D95D] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative bg-[#FAFAF8] py-20 selection:bg-[#F1D95D]/30 overflow-hidden"
    >
      <Textura opacity={0.03} />

      <div className="relative max-w-6xl mx-auto px-6">

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-24 items-start">

          <div className="space-y-10 lg:space-y-12">

            <Heading
              as="h2"
              size="lg"
              className="animate-up max-w-[720px] mx-auto lg:mx-0 text-center lg:text-left"
              font="medium"
            >
              <RichText content={data.header.title} />
            </Heading>

            <div className="space-y-5 max-w-[560px] mx-auto lg:mx-0 text-center lg:text-left">

              {data.header.subtitle.map((paragraph, i) => (
                <Paragrafo
                  key={i}
                  className="animate-up text-[#0A0A0A] text-[16px] sm:text-[17px]"
                >
                  <RichText content={paragraph} />
                </Paragrafo>
              ))}

            </div>

            <div className="animate-up flex justify-center">
              <ButtonLink button={data.cta} />
            </div>

          </div>

          <div className="animate-up flex justify-center lg:justify-end lg:sticky lg:top-10 mt-4 lg:mt-0">

            <div className="w-full max-w-[420px] flex justify-center">
              <CardFundador data={data.founder} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}