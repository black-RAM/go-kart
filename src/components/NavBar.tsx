import logo from "/kart.png"
import shoppingCart from "../assets/shoppingCart.svg"
import idling from "../assets/idling.mp3"
import React, { useMemo } from "react"
import "../styles/NavBar.css"

const CarPedal: React.FC<{children: React.ReactNode}> = ({children}) => {
  const audio = useMemo(() => new Audio(idling), [])
  const playAudio = () => audio.play()
  const stopAudio = () => audio.pause()

  return (
    <figure className="grid justify-center">
      {/* pedal spindle */}
      <div className="flex justify-center">
        <div className="bg-stone-400 h-8 w-2"></div>
      </div>
      {/* pedal body */}
      <div className="z-10 relative -top-4 tilt-child-on-hover" onMouseOver={playAudio} onMouseLeave={stopAudio}>
        <div className="w-max py-2 px-4 bg-repeat bg-opacity-75 rounded-sm cursor-pointer rhombus-pattern">
          <div className="backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </figure>
  )
}

const NavBar: React.FC<{cart: number}> = ({cart}) => 
  <nav className="grid grid-cols-[1fr_repeat(2,_2fr)_1fr] w-full bg-gradient-to-r from-indigo-950 via-violet-950 to-indigo-950 text-red-50">
    <figure className="flex justify-center py-2">
      <div className="h-14 bg-red-50 rounded-full p-2">
        <img src={logo} className="h-full" alt="Go Kart logo" />
      </div>
    </figure>      

    <CarPedal>
      <h2 className="text-lg">
        <a>Home</a>
      </h2>
    </CarPedal>

    <CarPedal>
      <h2 className="text-lg">
        <a>Shop</a>
      </h2>
    </CarPedal>

    <figure className="flex justify-center items-center">
      <img src={shoppingCart} className="h-8" alt="Shopping cart icon" />
      <caption className="bg-indigo-800 w-6 rounded-full" style={{visibility: cart ? "visible" : "hidden"}}>
        {cart}
      </caption>
    </figure>
  </nav>

export default NavBar