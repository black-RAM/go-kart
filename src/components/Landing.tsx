import React, { useEffect, useRef } from "react"
import * as Plot from "@observablehq/plot"
import usePlayer from "../hooks/usePlayer"
import ObserverCallback from "../types/ObserverCallback"
import useObserver from "../hooks/useObserver"

import woosh from "../assets/whoosh.mp3"
import mallBackground from "../assets/mallBackground.jpg"
import cuboids3DArt from "../assets/milad-fakurian-9waPFLIzs1E-unsplash.jpg"
import squarePrisms3DArt from "../assets/milad-fakurian-drqGSDR-IUs-unsplash.jpg"
import customer1 from "../assets/christian-buehner-DItYlc26zVI-unsplash(1).jpg"
import customer2 from "../assets/christopher-campbell-rDEOVtE7vOs-unsplash(1).jpg"
import customer3 from "../assets/petr-sevcovic-e12wQLAjQi0-unsplash(1).jpg"
import customer4 from "../assets/prince-akachi-4Yv84VgQkRM-unsplash(1).jpg"
import customer5 from "../assets/prince-akachi-J1OScm_uHUQ-unsplash(1).jpg"
import notification from "../assets/notification.mp3"
import cameraSound from "../assets/cameraSound.mp3"
import logo from "/kart.png"

import customerGrowthData from "../assets/customerGrowth.json"

import "../styles/landing.css"

interface TestimonialProps {
  imgUrl: string,
  testimony: string,
  witness: string
}

const Testimonial: React.FC<TestimonialProps> = ({imgUrl, testimony, witness}) => 
  <li className="bg-rose-800 rounded-sm flex flex-col items-center text-center gap-4 p-4">
    <img src={imgUrl} alt="smiling person" className="size-32 rounded-full" />
    <p className="text-zinc-50">{testimony}</p>
    <p className="text-zinc-100 italic">- {witness}</p>
  </li>

const LandingPage = () => {
  const [playWoosh] = usePlayer(woosh)
  const [playNotification, endNotification] = usePlayer(notification)
  const [playCamera, endCamera] = usePlayer(cameraSound)

  const headerRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const testimonialSoundRef = useRef<number | null>(null)

  const animateHeader: ObserverCallback = (isVisible) => {
    const {current} = headerRef
    if(!current) return
    if(isVisible) {
      if(!current.classList.contains("animated")) setTimeout(playWoosh, 2000)
      current.classList.add("animated")
    } else {
      current.classList.remove("animated")
    }
  }

  const animateCta: ObserverCallback = (isVisible) => {
    const {current} = ctaRef
    if(!current) return

    if(isVisible) {
      if(!current.classList.contains("animated")) {
        setTimeout(playNotification, 200)
        setTimeout(endNotification, 1600)
        setTimeout(playNotification, 2000)
      }
      current.classList.add("animated")
    } else {
      current.classList.remove("animated")
    }
  }

  const animateTestimonials: ObserverCallback = (isVisible) => {
    const {current} = testimonialsRef
    if(!current) return
    if(isVisible) {
      if(testimonialSoundRef.current) clearInterval(testimonialSoundRef.current)
      testimonialSoundRef.current = setInterval(() => {
        playCamera()
        setTimeout(endCamera, 1000)
      }, 4000)
      current.classList.add("animated")
    } else {
      if(testimonialSoundRef.current) clearInterval(testimonialSoundRef.current)
      current.classList.remove("animated")
    }
  }

  useObserver(headerRef, animateHeader)
  useObserver(ctaRef, animateCta, 0.6)
  useObserver(testimonialsRef, animateTestimonials, 1)

  const customerGrowthGraphRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const customerGrowthDataTyped = customerGrowthData.map(({ year, customers, type }) => ({
      year: new Date(year, 0, 1),
      customers,
      type
    }))

    const customerGrowthGraph = Plot.plot({
      y: {grid: true},
      color: {legend: true},
      marks: [
        Plot.areaY(customerGrowthDataTyped, {x: "year", y: "customers", fill: "type", fillOpacity: 0.6}),
      ]
    })
    customerGrowthGraphRef.current?.appendChild(customerGrowthGraph)
    
    return () => {
      customerGrowthGraph.remove()
    }
  }, [])

  return (
    <main>
      <header ref={headerRef} className="grid grid-cols-2 bg-center bg-cover" id="header-wrapper" style={{backgroundImage: `url(${mallBackground})`}}>
        <div className="overflow-hidden">
          <div id="header-container" className="h-full w-full flex items-center p-8 backdrop-blur">
            <h1 className="text-9xl text-right font-black uppercase">Let's Go Kart!</h1>
          </div>
        </div>

        <div className="relative overflow-hidden flex items-end">
          <div id="welcome-container" className="bg-zinc-50 bg-opacity-80 rounded-tr w-3/4 p-4 backdrop-blur-sm">
            <h2 className="text-3xl w-max p-2 font-bold text-slate-900 bg-zinc-50 shadow">Welcome to GoKart</h2>
            <p className="mt-2 text-lg font-semibold text-slate-800">
              Envision shopping as visceral as a 200 miles per hour race! Imagine the scent of fresh leather, the sound of engines roaring, and the sight of sleek, shiny products zooming into your cart. Our deals are as sweet as victory champagne, and our variety as wide as a racetrack. Ready to put the pedal to the metal? Buckle up, because at GoKart, we turn every shopping spree into a Grand Prix of savings and smiles!
            </p>
          </div>
        </div>
      </header>

      <section className="h-96 bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${cuboids3DArt})`}}></section>

      <section className="grid grid-rows-3 md:grid-cols-3">
        <article className="row-span-2 col-span-2 bg-zinc-100 p-2">
          <h2 className="text-5xl text-zinc-800 font-black uppercase">Here are the <b className="text-blue-800">facts</b></h2>
          <div className="grid lg:grid-cols-[75%_25%] xl:grid-cols-[640px_1fr]">
            <div ref={customerGrowthGraphRef}></div>
            <div className="flex flex-col justify-center p-4">
              <h3 className="text-lg capitalize underline">Unprecedented customer <b>growth</b></h3>
              <p>Our customer base has surged from zero to 25,000 in just 20 years.</p>
              <p>Join thousands of satisfied shoppers and experience why GoKart is the go-to destination for all your needs.</p>
            </div>
          </div>
        </article>
        <article className="col-start-3 row-span-3 bg-zinc-600"></article>
        <article className="col-start-1 col-span-2 row-start-3 bg-slate-950"></article>
      </section>
      
      <section className="h-96 bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${squarePrisms3DArt})`}}></section>

      <section className="bg-gradient-to-b from-indigo-950 to-rose-950 py-4">
        <hgroup className="text-zinc-100 text-center my-4">
          <h3 className="font-light text-2xl">What Our Customers</h3>
          <h2 className="font-bold text-4xl">Are Saying</h2>
        </hgroup>

        <div ref={testimonialsRef} className="relative overflow-hidden" id="testimonials-wrapper">
          <div className="absolute inset-0 z-10 pointer-events-none border-black border-opacity-50" id="testimonials-overlay"></div>
          <ul id="testimonials">
            <Testimonial imgUrl={customer1} testimony="I was skeptical at first, but GoKart exceeded my expectations. Great prices, quality products, and hassle-free returns. Highly recommend!" witness="Michael R." />
            <Testimonial imgUrl={customer2} testimony="GoKart is a game-changer. Amazing variety, detailed descriptions, and top-notch customer service. They've earned my trust!" witness="Emily J." />
            <Testimonial imgUrl={customer3} testimony="Incredible selection and unbeatable prices on GoKart. Easy navigation, fast shipping, and secure payments. I can't shop anywhere else now!" witness="David K." />
            <Testimonial imgUrl={customer4} testimony="GoKart has transformed my online shopping experience! Fast shipping, excellent customer service, and a user-friendly site. My go-to for everything!" witness="Arthur M."/>
            <Testimonial imgUrl={customer5} testimony="Positive experiences all around with GoKart. Great interface, prompt delivery, and excellent product quality. Love it!" witness="Sarah T."/>
          </ul>
        </div>
      </section>

      <section ref={ctaRef} className="bg-gradient-to-br from-slate-200 to-red-200" id="cta">
        <div className="flex flex-col justify-around px-4 min-h-80 overflow-hidden" style={{backgroundImage: `url(${logo})`}}>
          <p className="text-bubble left">Ready to experience the thrill of seamless online shopping?</p>
          <p className="text-bubble right">Start your engines and shop at GoKart today for unbeatable speed, service, and quality!</p>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
