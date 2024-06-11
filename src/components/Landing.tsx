import mallBackground from "../assets/mallBackground.jpg"
import "../styles/landing.css"

const LandingPage = () => {
  return (
    <main>
      <header className="h-[75vh] grid grid-cols-2 bg-center bg-cover" style={{backgroundImage: `url(${mallBackground})`}}>

        <div className="relative overflow-hidden">
          <div id="cta-container" className="h-full w-full absolute flex items-center p-8 backdrop-blur-sm text-orange-600 hover:text-red-600 transition-colors duration-1000">
            <h1 className="text-9xl text-right font-black uppercase">Let's Go Kart!</h1>
          </div>
        </div>
      </header>
    </main>
  )
}

export default LandingPage
