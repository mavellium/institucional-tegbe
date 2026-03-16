import { LogosApiData } from "@/types/logos.type";
import Image from "next/image";

interface LogoItemProps {
  logo: LogosApiData;
  config: any;
}

export default function LogoItem({ logo, config }: LogoItemProps) {
  const handleClick = () => {
    if (logo.url && logo.url !== '#') {
      window.open(logo.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className="flex-shrink-0 px-8 md:px-16 group cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width || 150}
        height={logo.height || 100}
        className={`w-auto ${config.logoHeight} object-contain transition-all duration-500 ${config.logoFilter} ${config.logoOpacity} group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105`}
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    </div>
  );
}