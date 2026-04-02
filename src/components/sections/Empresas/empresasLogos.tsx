import Logos from "@/components/sections/Logos";

export default function EmpresasLogos({ logos }: any) {
  const parsedLogos = Array.isArray(logos) ? logos : [...(logos.row1 || []), ...(logos.row2 || [])];

  const formatted = parsedLogos.map((logo: any, i: number) => ({
    id: `logo-${i}`,
    image: logo.src || logo.image,
    alt: logo.alt,
    width: logo.width || 150,
    height: logo.height || 100,
  }));

  return <Logos data={{ values: formatted }} />;
}
