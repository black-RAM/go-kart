import React, { useRef } from "react"
import usePlayer from "../hooks/usePlayer"
import ObserverCallback from "../types/ObserverCallback"
import useObserver from "../hooks/useObserver"

import woosh from "../assets/whoosh.mp3"
import mallBackground from "../assets/mallBackground.jpg"
import customer1 from "../assets/christian-buehner-DItYlc26zVI-unsplash(1).jpg"
import customer2 from "../assets/christopher-campbell-rDEOVtE7vOs-unsplash(1).jpg"
import customer3 from "../assets/petr-sevcovic-e12wQLAjQi0-unsplash(1).jpg"
import customer4 from "../assets/prince-akachi-4Yv84VgQkRM-unsplash(1).jpg"
import customer5 from "../assets/prince-akachi-J1OScm_uHUQ-unsplash(1).jpg"
import logo from "/kart.png"
import "../styles/landing.css"

interface Parent{
  children: React.ReactNode
}

const CustomTopBorder: React.FC<Parent> = ({children}) => 
  <article className="max-w-80 h-[30rem] mb-8 rounded bg-zinc-300 bg-opacity-75">
    <div className="border-t-8 border-l-8 border-r-8 border-zinc-200 rounded h-52"></div>
    <div className="mx-8 relative -top-44">{children}</div>
  </article>

interface TestimonialProps {
  imgUrl: string,
  testimony: string,
  witness: string
}

const Testimonial: React.FC<TestimonialProps> = ({imgUrl, testimony, witness}) => 
  <article className="bg-rose-800 rounded-sm grow basis-60 flex flex-col items-center text-center gap-4 p-4">
    <img src={imgUrl} alt="smiling person" className="size-32 rounded-full" />
    <p className="text-zinc-50">{testimony}</p>
    <p className="text-zinc-100 italic">- {witness}</p>
  </article>

const LandingPage = () => {
  const [playWoosh] = usePlayer(woosh)

  const headerRef = useRef<HTMLElement>(null)

  const animateHeader: ObserverCallback = (isVisible) => {
    const {current} = headerRef
    if(!current) return 

    if (isVisible) {
      current.classList.add("animated")
      setTimeout(playWoosh, 2000)
    } else {
      current.classList.remove("animated")
    }
  }

  useObserver(headerRef, animateHeader)

  return (
    <main>
      <header ref={headerRef} className="grid grid-cols-2 bg-center bg-cover" style={{height: "calc(100vh - 76px)", backgroundImage: `url(${mallBackground})`}}>
        <div className="relative overflow-hidden">
          <div id="cta-container" className="h-full w-full absolute flex items-center p-8 backdrop-blur text-orange-600 hover:text-red-600 transition-colors duration-1000">
            <h1 className="text-9xl text-right font-black uppercase">Let's Go Kart!</h1>
          </div>
        </div>

        <div className="relative overflow-hidden flex items-end">
          <div id="welcome-container" className="absolute bg-zinc-50 bg-opacity-80 rounded-tr w-3/4 p-4 backdrop-blur-sm">
            <h2 className="text-3xl w-max p-2 font-bold text-slate-900 bg-zinc-50 shadow">Welcome to GoKart</h2>
            <p className="mt-2 text-lg font-semibold text-slate-800">Welcome to Go Kart – your ultimate destination for a shopping experience that’s as exhilarating as a high-speed race. Here, shopping isn't just an errand; it's an adventure. Imagine a place where every click and scroll is like taking a sharp turn on a thrilling race track, where the anticipation of finding that perfect item is as electrifying as the countdown before a race.</p>
          </div>
        </div>
      </header>

      <section className="flex justify-center bg-fixed" style={{backgroundImage: "radial-gradient(#0284c7, #1e1b4b)"}}>
        <div className="flex gap-x-8 p-8">
          <div>
            <CustomTopBorder>
              <h2 className="text-xl underline font-medium mb-2">Navigate with Ease</h2>
              <p className="text-gray-900">Step into Go Kart and feel the rush of excitement wash over you. Our virtual aisles are designed to mimic the sleek, streamlined tracks of a go-kart race, leading you effortlessly to your destination. Picture yourself weaving through a vibrant marketplace, each product a hidden gem waiting to be discovered. The interface is as intuitive and responsive as a finely tuned kart, responding to your every command with lightning speed.</p>
            </CustomTopBorder>
            
            <CustomTopBorder>
              <h2 className="text-xl underline font-medium mb-2">Engage Your Senses</h2>
              <p>As you navigate our store, let your senses be your guide. The vivid images of our high-quality products almost leap off the screen, inviting you to reach out and touch them. Imagine the texture of a luxurious cashmere sweater, the crisp snap of a fresh apple, the gleam of a new kitchen gadget catching the light just so. You can almost hear the satisfying click of adding an item to your cart, each one a milestone on your shopping journey.</p>
            </CustomTopBorder>
          </div>
          
          <div className="mt-16">
            <CustomTopBorder>
              <h2 className="text-xl underline font-medium mb-2">Expert Assistance</h2>
              <p>Our team at Go Kart is here to ensure your experience is as smooth and enjoyable as a victory lap. Our customer service experts are the pit crew of your shopping journey, always ready with a friendly wave and expert advice. They're here to help you fine-tune your shopping strategy, ensuring that you find exactly what you're looking for, and maybe even something unexpected that makes your heart race with joy.</p>
            </CustomTopBorder>

            <CustomTopBorder>
              <h2 className="text-xl underline font-medium mb-2">Celebrate Your Wins</h2>
              <p>Every purchase at Go Kart is a celebration, a confetti-filled moment of triumph. Imagine crossing the finish line, arms raised in victory, as your order confirmation pops up on the screen. Feel the thrill of knowing that your treasures are on their way to you, ready to enhance your life and bring you joy.</p>
            </CustomTopBorder>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-indigo-950 to-rose-950 p-4">
        <hgroup className="text-zinc-100 text-center my-4">
          <h3 className="font-light text-2xl">What Our Customers</h3>
          <h2 className="font-bold text-4xl">Are Saying</h2>
        </hgroup>

        <section className="flex flex-wrap justify-center gap-6 overflow-y-scroll">
          <Testimonial imgUrl={customer1} testimony="I was skeptical at first, but GoKart exceeded my expectations. Great prices, quality products, and hassle-free returns. Highly recommend!" witness="Michael R." />
          <Testimonial imgUrl={customer2} testimony="GoKart is a game-changer. Amazing variety, detailed descriptions, and top-notch customer service. They've earned my trust!" witness="Emily J." />
          <Testimonial imgUrl={customer3} testimony="Incredible selection and unbeatable prices on GoKart. Easy navigation, fast shipping, and secure payments. I can't shop anywhere else now!" witness="David K." />
          <Testimonial imgUrl={customer4} testimony="GoKart has transformed my online shopping experience! Fast shipping, excellent customer service, and a user-friendly site. My go-to for everything!" witness="Arthur M."/>
          <Testimonial imgUrl={customer5} testimony="Positive experiences all around with GoKart. Great interface, prompt delivery, and excellent product quality. Love it!" witness="Sarah T."/>
        </section>
      </section>

      <section className="bg-gradient-to-br from-slate-200 via-orange-200 to-stone-200">
        <div className="flex flex-col px-4 py-16 gap-16" style={{backgroundImage: `url(${logo})`}}>
          <p className="text-bubble left">Ready to experience the thrill of seamless online shopping?</p>
          <p className="text-bubble right">Start your engines and shop at GoKart today for unbeatable speed, service, and quality!</p>
        </div>
      </section>
    </main>
  )
}

export default LandingPage
