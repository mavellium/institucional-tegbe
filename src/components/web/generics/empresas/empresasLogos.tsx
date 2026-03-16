import Logos from "../../logos"


export default function EmpresasLogos({ logos }: any) {

  const parsedLogos = Array.isArray(logos)
    ? logos
    : [...(logos.row1 || []), ...(logos.row2 || [])]

  const formatted = parsedLogos.map((logo: any, i: number) => ({
    id: `logo-${i}`,
    src: logo.src,
    alt: logo.alt,
    width: logo.width || 150,
    height: logo.height || 100,
    url: logo.url
  }))

  return (
    <Logos
      data={formatted}
      variant="marketing"
    />
  )
}