import mallBackground from "../assets/mallBackground.jpg"
import woosh from "../assets/whoosh.mp3"
import usePlayer from "../hooks/usePlayer"
import "../styles/landing.css"

const LandingPage = () => {
  const [playWoosh] = usePlayer(woosh)
  setTimeout(playWoosh, 2000)

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
    </main>
  )
}

export default LandingPage
