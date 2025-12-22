import { Ads } from "@/components/Ads";
import { Dna } from "@/components/Dna";
import Ecommerce from "@/components/Ecommerce";
import { Header } from "@/components/Header";
import { Headline } from "@/components/Headline";
import Logos from "@/components/Logos";
import { News } from "@/components/News";
import { Roi } from "@/components/Roi";
import { SectionImage } from "@/components/SectionImage";
import SectionVideo from "@/components/SectionVideo";
import { Setors } from "@/components/Setors";
import Steps from "@/components/Steps";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Header></Header>
    <Headline></Headline>
    <Logos></Logos>
    <Ecommerce></Ecommerce>
    <Ads></Ads>
    <Setors></Setors>
    <Steps></Steps>
    <Roi></Roi>
    <SectionImage></SectionImage>
    <Dna></Dna>
    {/* <News></News> */}
    </>
  );
}
