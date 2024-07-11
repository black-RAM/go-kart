import { useRef } from "react"
import usePlayer from "../../hooks/usePlayer"
import useObserver from "../../hooks/useObserver"
import ObserverCallback from "../../types/ObserverCallback"
import mallBackground from "../../assets/mallBackground.jpg"
import woosh from "../../assets/whoosh.mp3"

const Hero = () => {
  const headerRef = useRef<HTMLElement>(null)
  const [playWoosh] = usePlayer(woosh)

  const animateHeader: ObserverCallback =(isVisible) => {
    const {current} = headerRef
    if(!current) return
    if(isVisible) {
      if(!current.classList.contains("animated")) setTimeout(playWoosh, 2000)
      current.classList.add("animated")
    } else {
      current.classList.remove("animated")
    }
  }

  useObserver(headerRef, animateHeader)

  return (
    <header ref={headerRef} className="grid lg:grid-cols-2 bg-center bg-cover" id="hero-wrapper" style={{backgroundImage: `url(${mallBackground})`}}>
      <div className="overflow-hidden">
        <div id="header-container" className="h-full w-full flex items-center p-8 backdrop-blur lg:h-[calc(100vh-76px)]">
          <h1 className="text-8xl sm:text-9xl text-center lg:text-right font-black uppercase" id="hero-header">Let's Go Kart!</h1>
        </div>
      </div>

      <div className="overflow-hidden flex items-end">
        <div id="welcome-container" className="bg-gradient-to-br from-stone-300 to-stone-50 lg:w-3/4 p-4 text-center lg:text-left flex flex-col items-center lg:items-start lg:rounded-tr-2xl">
          <h2 className="text-2xl sm:text-3xl w-max p-4 font-bold text-slate-900 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 rounded-2xl shadow-lg shadow-zinc-400">Welcome to GoKart</h2>
          <p className="my-4 text-lg font-semibold text-slate-800">
            Envision shopping as visceral as a 200 miles per hour race! Imagine the scent of fresh leather, the sound of engines roaring, and the sight of sleek, shiny products zooming into your cart. Our deals are as sweet as victory champagne, and our variety as wide as a racetrack. Ready to put the pedal to the metal? Buckle up, because at GoKart, we turn every shopping spree into a Grand Prix of savings and smiles!
          </p>
        </div>
      </div>
    </header>
  )
}

export default Hero