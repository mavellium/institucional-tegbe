import { Ads } from "@/components/Ads";
import { Dna } from "@/components/Dna";
import Ecommerce from "@/components/Ecommerce";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Headline } from "@/components/Headline";
import Logos from "@/components/Logos";
import  News  from "@/components/News";
import { Roi, defaultRoiData } from '@/components/Roi';
import { SectionImage } from "@/components/SectionImage";
import SectionVideo from "@/components/SectionVideo";
import { Setors } from "@/components/Setors";
import Steps from "@/components/Steps";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Header></Header>
    <main>
    <Headline></Headline>
    <Logos></Logos>
    <Steps></Steps>
    <Ecommerce></Ecommerce>
    <Ads></Ads>
    <Setors></Setors>
    <Roi data={defaultRoiData} />
    <SectionImage></SectionImage>
    <Dna></Dna>
    <News></News>
    </main>
    <Footer></Footer>
    </>
  );
}
