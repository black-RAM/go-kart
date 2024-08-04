import { useContext, useEffect, useState } from "react"
import ShopContext from "../../contexts/ShopContext"
import usePlayer from "../../hooks/usePlayer"
import chime1 from "../../assets/chimeSoundFSharp.mp3"
import chime2 from "../../assets/chimeSoundC.mp3"

const OrderButton: React.FC<{id: string}> = ({id}) => {
  const {cart, placeInCart} = useContext(ShopContext)
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  useEffect(() => {
    if(!isRegistered) {
      placeInCart(c => {
        if(Object.keys(c).some(key => key == id)) return c
        const clone = structuredClone(c)
        clone[id] = 0
        return clone
      })
      setIsRegistered(true)
    }
  }, [id, placeInCart, isRegistered])

  const [playChime1] = usePlayer(chime1)
  const [playChime2] = usePlayer(chime2)
  
  const increment = () => {
    playChime1()
    if(isRegistered) {
      placeInCart(cart => {
        const clone = structuredClone(cart)
        clone[id] = cart[id] + 1
        return clone
      })
    }
  }

  const decrement = () => {
    playChime2()
    if(isRegistered) {
      placeInCart(cart => {
        const clone = structuredClone(cart)
        clone[id] = cart[id] - 1
        return clone
      })
    }
  }

  if(cart[id] > 0) {
    return (
      <div className="flex justify-around w-full">
        <button title="reduce" onClick={decrement}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M360-640v-80h240v80H360ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
        </button>
        <p className="font-black w-20 text-center backdrop-brightness-75 bg-opacity-50">{cart[id]}</p>
        <button title="add" onClick={increment}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
        </button>
      </div>
    )
  } else {
    return (
      <button onClick={increment} className="flex items-center gap-2 justify-center w-full">
        <h5 className="uppercase text-xl">Buy</h5>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
      </button>
    )
  }
}

export default OrderButton