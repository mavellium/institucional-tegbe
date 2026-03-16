import { RichBlock } from "@/types/richBlock.type";
import RichText from "./richText";
import Heading from "../heading";
import Paragrafo from "../paragrafo";
import Lista from "../lista";

interface RichContentProps {
  blocks: RichBlock[];
}

export default function RichContent({ blocks }: RichContentProps) {
  return (
    <>
      {blocks.map((block, i) => {

        switch (block.type) {

            case "paragraph":
            return (
                <Paragrafo key={i} className={block.className}>
                <RichText content={block.content} />
                </Paragrafo>
            );

            case "heading":
                return (
                    <Heading
                    key={i}
                    as={`h${block.level}`}
                    size={block.size}
                    className={block.className}
                    >
                    <RichText content={block.content} />
                    </Heading>
                );

            case "list":
            return (
                <Lista
                key={i}
                items={block.items.map((item, j) => (
                    <RichText key={j} content={item} />
                ))}
                ordered={block.ordered}
                />
            );

          case "image":
            return (
              <img
                key={i}
                src={block.src}
                alt={block.alt || ""}
              />
            );

          case "quote":
            return (
              <blockquote key={i}>
                <RichText content={block.content}/>
                {block.author && <footer>{block.author}</footer>}
              </blockquote>
            );

          case "grid":
            return (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${block.columns},1fr)`
                }}
              >
                {block.items.map((item, j) => (
                  <RichContent key={j} blocks={[item]} />
                ))}
              </div>
            );

          case "card":
            return (
              <div key={i} className="card">

                <h3>
                  <RichText content={block.title}/>
                </h3>

                <p>
                  <RichText content={block.text}/>
                </p>

              </div>
            );

        }

      })}
    </>
  );
}