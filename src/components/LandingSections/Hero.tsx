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
  )
}

export default Hero