
import { ILogo } from "@/interface/imagem/ILogo";
import Image from "next/image";

interface LogoItemProps {
  logo: ILogo;
  config: any;
}

export default function LogoItem({ logo, config }: LogoItemProps) {

  return (
    <div
      className="flex-shrink-0 px-8 md:px-16 group cursor-pointer flex items-center justify-center"
    >
      <div className="h-[40px] md:h-[50px] flex items-center">
        <Image
          src={logo.values.image}
          alt={logo.values.alt}
          width={200}
          height={100}
          className={`h-full w-auto object-contain transition-all duration-500 ${config.logoFilter} ${config.logoOpacity} group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105`}
        />
      </div>
    </div>
  );
}