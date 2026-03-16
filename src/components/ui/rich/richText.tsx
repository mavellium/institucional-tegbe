"use client";

import { Icon } from "@iconify/react";
import Highlight from "../highlight";
import { RichTextItem } from "@/types/richText.type";
import Link from "next/link";

interface RichTextProps {
  content: RichTextItem[];
}

const fonts = {
  light: "font-light",
  regular: "font-normal",
  medium: "font-medium",
  bold: "font-bold",
  black: "font-black",
};

export default function RichText({ content = [] }: RichTextProps) {
  return (
    <>
      {content.map((item, i) => {
        switch (item.type) {

          case "text":
            return <span key={`text-${i}`} className={fonts[item.font ?? "regular"]} style={{ fontSize: item.size ? `${item.size}px` : undefined }}>{item.value}</span>;

          case "bold":
            return <span key={`bold-${i}`} className={`font-bold`} style={{ fontSize: item.size ? `${item.size}px` : undefined }}>{item.value}</span>;

          case "highlight":
            return (
              <Highlight
                key={`highlight-${i}`}
                color={item.color}
                withSerif={item.serif}
                withItalic={item.italic}
                className={fonts[item.font ?? "regular"]}
              >
                {item.value}
              </Highlight>
            );

          case "gradient":
            return (
              <span
                key={`gradient-${i}`}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
              >
                {item.value}
              </span>
            );

          case "link":
            return (
              <Link
                key={`link-${i}`}
                href={item.href}
                className="underline hover:opacity-80"
              >
                {item.value}
              </Link>
            );

          case "icon":
            return (
              <Icon
                key={`icon-${i}`}
                icon={item.value}
                className="inline text-[1em] mx-1"
              />
            );

          case "emoji":
            return <span key={`emoji-${i}`}>{item.value}</span>;

          case "linebreak":
            return <br key={`br-${i}`} />;
            
          default:
            return null;
        }
      })}
    </>
  );
}