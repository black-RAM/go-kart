import { useContext, useEffect, useState } from "react"
import ShopContext from "../../contexts/ShopContext"
import usePlayer from "../../hooks/usePlayer"
import Product from "../../types/Product"
import chime1 from "../../assets/chimeSoundFSharp.mp3"
import chime2 from "../../assets/chimeSoundC.mp3"

const ProductCard: React.FC<{p: Product}> = ({p}) => {
  const {cart, placeInCart} = useContext(ShopContext)
  const [cartItemIndex, setCartItemIndex] = useState<number>(-1)

  useEffect(() => {
    if(cart.findIndex(item => item.id == p.id) < 0) {
      placeInCart(c => [...c, {id: p.id, count: 0}])
      setCartItemIndex(cart.length)
    }
  }, [cart, p.id, placeInCart])

  const [playChime1] = usePlayer(chime1)
  const [playChime2] = usePlayer(chime2)
  
  const increment = () => {
    playChime1()
    console.log(cartItemIndex)
    if(cartItemIndex >= 0) {
      placeInCart(cart => {
        const clone = structuredClone(cart)
        clone[cartItemIndex].count = cart[cartItemIndex]?.count + 1
        return clone
      })
    }
  }

  const decrement = () => {
    playChime2()
    if(cartItemIndex >= 0) {
      placeInCart(cart => {
        const clone = structuredClone(cart)
        clone[cartItemIndex].count = cart[cartItemIndex]?.count - 1
        return clone
      })
    }
  }

  let orderButton: React.JSX.Element

  if(cart[cartItemIndex]?.count > 0) {
    orderButton = (
      <div className="flex justify-around w-full">
        <button title="reduce" onClick={decrement}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M360-640v-80h240v80H360ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
        </button>
        <p className="font-black w-20 text-center bg-green-800 bg-opacity-50">{cart[cartItemIndex]?.count}</p>
        <button title="add" onClick={increment}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
        </button>
      </div>
    )
  } else {
    orderButton = (
      <button onClick={increment} className="flex items-center gap-2 justify-center w-full">
        <h5 className="uppercase text-xl">Buy</h5>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
      </button>
    )
  }

  return (
    <article className="grid items-center rounded-xl w-56 sm:w-80 shadow hover:shadow-lg shadow-neutral-800 hover:shadow-neutral-800
     bg-white">
      <figure className="flex justify-center rounded-t-xl">
        <img src={p.image} alt={p.title} className="h-40 sm:h-60" />
      </figure>
      <div className="grid grid-cols-[1fr_min-content] p-2 h-full rounded-b-xl bg-gradient-to-r from-blue-50 to-blue-200">
        <h4 className="flex items-center text-sm">{p.title}</h4>
        <div className="flex justify-center items-center">
          <p className="bg-amber-200 text-blue-950 rounded-full p-2 w-max h-min text-sm sm:text-base">${p.price}</p>
        </div>
        <div className="buy-wrapper col-span-2 h-9 text-blue-50 fill-blue-50 m-1 relative overflow-hidden">
          <div className="buy-background bg-gradient-to-r from-green-600 via-lime-500 to-green-600 h-full w-full"></div>
          <div className="z-10 absolute inset-0 grid items-center">{orderButton}</div>
        </div>
      </div>
    </article>
  )
}

export default ProductCard