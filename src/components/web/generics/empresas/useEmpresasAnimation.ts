import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useEmpresasAnimation(ref:any){

  useGSAP(()=>{

    const tl = gsap.timeline({
      scrollTrigger:{
        trigger: ref.current,
        start:"top 75%"
      }
    })

    tl.fromTo(
      ".reveal-trust",
      {y:30,opacity:0},
      {y:0,opacity:1,duration:.8,stagger:.1}
    )

  },{scope:ref})
}