import { useContext } from "react"
import ShopContext from "../contexts/ShopContext"
import wallpaper from "../assets/google-deepmind-8izdP4Ec9rA-unsplash.jpg"
import "../styles/Checkout.css"
import { Link } from "react-router-dom"
import woosh from "../assets/fast-whoosh-118248.mp3"
import usePlayer from "../hooks/usePlayer"
import Product from "../types/Product"

interface CountedProduct extends Product {
  count: number
}

const Checkout = () => {
  const {cart, catalog} = useContext(ShopContext)
  const products = Object.entries(cart)
    .filter(entry => entry[1] > 0)
    .map(([id, count]) => {
      const product = catalog.find(p => p.id == Number(id)) as CountedProduct
      product.count = count
      return product
    })

  const [playWoosh] = usePlayer(woosh)
  
  return (
    <main className="bg-cover bg-center" style={{backgroundImage: `url(${wallpaper})`}}>
      {
        products.length > 0 ? 
        null : 
        <div className="grid justify-center items-center h-dvh">
          <section className="checkout-receipt backdrop-blur-sm rounded-3xl p-6 mx-6 md:w-[454px]">
            <hgroup className="flex items-end pb-1 gap-1 border-b-2 border-b-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-8 md:size-12 fill-red-600 animate-pulse">
                <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
              <h1 className="text-red-800 font-bold text-3xl md:text-5xl">Box, Box, Box!</h1>
            </hgroup>
            <div className="grid p-2 gap-2 font-semibold md:text-xl text-slate-800">
              <p>Oops, your cart is running on empty! Zoom back to the shop page and fuel up with some fantastic finds!</p>
              <Link to="/shop">
                <div className="bg-blue-800 hover:bg-blue-900 text-white p-2 rounded flex justify-center" onClick={playWoosh}>
                  <p>GoKart!</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
        }
    </main>
  )
}

export default Checkout