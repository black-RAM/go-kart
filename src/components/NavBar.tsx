import usePlayer from "../hooks/usePlayer"

import logo from "/kart.png"
import revving from "../assets/revving.mp3"
import kaching from "../assets/kaching.mp3"
import synthC4 from "../assets/synthC4.mp3"
import { Link } from "react-router-dom"
import "../styles/NavBar.css"

const CarPedal: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [play, pause] = usePlayer(revving, true)

  return (
    <figure className="grid justify-center">
      {/* pedal spindle */}
      <div className="flex justify-center">
        <div className="bg-stone-400 h-8 w-2"></div>
      </div>
      {/* pedal body */}
      <div className="z-10 relative -top-4 tilt-child-on-hover" onMouseOver={play} onMouseLeave={pause}>
        <div className="w-max py-2 px-4 bg-repeat bg-opacity-75 rounded-sm cursor-pointer rhombus-pattern">
          <div className="backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </figure>
  )
}

const NavBar: React.FC<{cartCount: number}> = ({cartCount}) => {
  const [playRegister] = usePlayer(kaching)
  const [playNote] = usePlayer(synthC4)
  const playAll = async() => {
    playRegister()
    playNote()
  }

  return (
    <nav className="w-full grid grid-cols-[1fr_repeat(2,_2fr)_1fr] bg-gradient-to-r from-indigo-950 via-violet-950 to-indigo-950 text-red-50">
      <div className="flex justify-center py-2">
        <figure className="h-14 bg-red-50 rounded-full p-2">
          <img src={logo} className="h-full" alt="Go Kart logo" />
        </figure>
      </div>      

      <Link to="/">
        <CarPedal>
          <h2 className="text-lg">Home</h2>
        </CarPedal>
      </Link>

      <Link to="shop">
        <CarPedal>
          <h2 className="text-lg">Shop</h2>
        </CarPedal>
      </Link>

      <div className="flex justify-center items-center hover:text-red-100 transition-colors">
        <a className="cursor-pointer" onClick={playAll}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-8 w-8 fill-red-50 hover:fill-red-100 transition-colors">
            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
          </svg>
        </a>

        <div className="bg-indigo-800 size-7 rounded-full flex items-center justify-center" style={{visibility: cartCount ? "visible" : "hidden"}}>
          {cartCount}
        </div>
      </div>
    </nav>
  )
}

export default NavBar