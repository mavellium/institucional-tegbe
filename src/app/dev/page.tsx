"use client";

import RichContent from "@/components/ui/richBlock";
import { RichBlock } from "@/types/richBlock.type";

const mockPage: RichBlock[] = [

  {
    type: "heading",
    level: 1,
    content: [
      { type: "text", value: "Construindo " },
      { type: "highlight", value: "máquinas de vendas", color: "#F1D95D" }
    ]
  },

  {
    type: "paragraph",
    content: [
      {
        type: "text",
        value:
          "A Tegbe ajuda empresas a estruturar canais de vendas que crescem de forma previsível."
      }
    ]
  },

  {
    type: "image",
    src: "/foto_card.avif",
    alt: "Equipe trabalhando"
  },

  {
    type: "heading",
    level: 2,
    content: [
      { type: "text", value: "Nosso " },
      { type: "highlight", value: "método", color: "#F1D95D" }
    ]
  },

  {
    type: "list",
    items: [
      [{ type: "text", value: "Diagnóstico do negócio" }],
      [{ type: "text", value: "Estruturação dos canais" }],
      [{ type: "text", value: "Execução e escala" }]
    ]
  },

  {
    type: "quote",
    content: [
      {
        type: "text",
        value:
          "Empresas crescem quando vendas deixam de ser esforço e viram sistema."
      }
    ],
    author: "Tegbe"
  },

  {
    type: "grid",
    columns: 3,
    items: [
      {
        type: "card",
        title: [
          { type: "text", value: "Estratégia" }
        ],
        text: [
          {
            type: "text",
            value: "Planejamento de canais e posicionamento."
          }
        ]
      },

      {
        type: "card",
        title: [
          { type: "text", value: "Execução" }
        ],
        text: [
          {
            type: "text",
            value: "Operação e gestão das plataformas."
          }
        ]
      },

      {
        type: "card",
        title: [
          { type: "text", value: "Escala" }
        ],
        text: [
          {
            type: "text",
            value: "Automação e crescimento previsível."
          }
        ]
      }
    ]
  }

];

export default function devPage() {

  return (

    <main className="max-w-4xl mx-auto py-24 px-6 space-y-10">

      <RichContent blocks={mockPage} />

    </main>

  );

}