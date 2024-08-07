import usePlayer from "../hooks/usePlayer"
import logo from "/kart.png"
import kaching from "../assets/kaching.mp3"
import { Link } from "react-router-dom"
import { useContext } from "react"
import ShopContext from "../contexts/ShopContext"
import "../styles/NavBar.css"
import CarPedal from "./NavbarComponents/CarPedal"

const NavBar = () => {
  const {cart} = useContext(ShopContext)
  const cartCount = Object.values(cart).reduce((sum, current) => sum + current, 0)
  const [playKaching] = usePlayer(kaching)

  return (
    <nav className="w-full grid grid-cols-[1fr_repeat(2,_2fr)_1fr] px-2 bg-gradient-to-r from-indigo-950 via-violet-950 to-indigo-950 text-red-50">
      <div className="flex justify-center py-2">
        <figure className="h-14 bg-red-50 rounded-full p-2">
          <img src={logo} className="h-full" alt="Go Kart logo" />
        </figure>
      </div>      

      <Link to="/">
        <CarPedal>
          <h2 className="text-base sm:text-lg">Home</h2>
        </CarPedal>
      </Link>

      <Link to="shop">
        <CarPedal>
          <h2 className="text-base sm:text-lg">Shop</h2>
        </CarPedal>
      </Link>

      <div className="flex justify-center items-center hover:text-red-100 transition-colors">
        <Link to="checkout">
          <svg onClick={playKaching} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-8 w-8 fill-white hover:fill-rose-200 transition-colors">
            <path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/>
          </svg>
        </Link>

        <div className="bg-indigo-800 size-6 text-sm font-bold rounded-full items-center justify-center" style={{display: cartCount > 0 ? "flex" : "none"}}>
          {cartCount}
        </div>
      </div>
    </nav>
  )
}

export default NavBar