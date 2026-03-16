import { IParceiro } from "@/interface/parceiro/IParceiro"

export const parceirosMock: IParceiro[] = [
  {
    id: 1,

    nome: "João Branco",

    cargo: "Ex-CMO do McDonald's",

    depoimento: [
      { type: "text", value: "Top 10 profissionais de marketing no Brasil pela Forbes. " },
      { type: "bold", value: "Considerado CMO mais eficaz do país pela Scopen." }
    ],

    img_principal: "/dev/foto_card.avif",
    img_principal_alt: "Ferrero",

    img_nome: "/dev/foto_nome_card.avif",
    img_nome_alt: "Ferrero",

    img_logo: "/dev/foto_logo_card.avif",
    img_logo_alt: "McDonald's"
  }
]