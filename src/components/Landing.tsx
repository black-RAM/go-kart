import React, { useEffect } from "react"
import mallBackground from "../assets/mallBackground.jpg"
import woosh from "../assets/whoosh.mp3"
import usePlayer from "../hooks/usePlayer"
import "../styles/landing.css"

const CustomTopBorder: React.FC<{children: React.ReactNode}> = ({children}) => 
  <article className="max-w-80 h-[30rem] mb-8 rounded bg-zinc-300 bg-opacity-75">
    <div className="border-t-8 border-l-8 border-r-8 border-zinc-200 rounded h-52"></div>
    <div className="mx-8 relative -top-44">{children}</div>
  </article>

const LandingPage = () => {
  const [playWoosh] = usePlayer(woosh)
  useEffect(() => {
    setTimeout(playWoosh, 2000)
  }, [playWoosh])

  return (
    <main>
      <header className="h-[80vh] grid grid-cols-2 bg-center bg-cover" style={{backgroundImage: `url(${mallBackground})`}}>
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
    </main>
  )
}

export default LandingPage
