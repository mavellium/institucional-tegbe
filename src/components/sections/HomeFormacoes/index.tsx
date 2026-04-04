import Image from "next/image";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button/button";
import { IButton } from "@/interface/button/IButton";
import RichText from "@/components/ui/rich/richText";
import { RichTextItem } from "@/types/richText.type";
import { IImage } from "@/interface/imagem/IImage";

/* =========================
   INTERFACE DA API
========================= */

interface homeFormacoesData {
  heading: RichTextItem[];
  button: IButton;
  image: IImage;
}

/* =========================
   COMPONENT
========================= */
export default function HomeFormacoes({ data }: { data: homeFormacoesData | null }) {
  if (!data) return null;

  return (
    <section className="relative w-full h-[90vh] overflow-hidden flex items-center">
      {/* BACKGROUND */}
      <div className="absolute inset-0 grayscale">
        <Image
          src={data.image.src}
          alt="Fundo"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover"
          priority
          fetchPriority="high"
        />
      </div>

      {/* OVERLAY */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage: "linear-gradient(45deg, rgba(0, 0, 0, .1) -70%, rgba(0, 0, 0, 1) 60%)",
          backgroundSize: "3px 3px",
          zIndex: 2,
        }}
      />

      {/* CONTAINER */}
      <div className="relative z-[3] w-full h-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-12 lg:gap-0 py-12 lg:py-0">
        {/* TEXTO (Fica embaixo no mobile, esquerda no desktop) */}
        <div className="order-2 lg:order-1 max-w-2xl space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* HEADING */}
          <div>
            <Heading
              align="center"
              className="md:text-left text-4xl md:text-6xl font-black tracking-tight text-white leading-tight"
            >
              <RichText content={data.heading} />
            </Heading>
          </div>

          {/* BOTAO */}
          {data.button.action === "link" && (
            <div className="pt-2 lg:pt-4">
              <Button className="px-8 py-4 lg:px-10 lg:py-5 uppercase tracking-widest text-xs lg:text-sm font-bold w-fit transition-transform hover:scale-105">
                <Link href={data.button.link}>{data.button.label}</Link>
              </Button>
            </div>
          )}
        </div>

        {/* IMAGEM (Fica no topo no mobile, direita no desktop) */}
        <div className="order-1 lg:order-2 flex items-center lg:items-end pointer-events-none w-48 md:w-64 lg:w-auto">
          <Image
            src="/tegpro_logo.svg"
            alt="Logo"
            width={400}
            height={600}
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
