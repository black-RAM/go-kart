import React, { useContext, useEffect, useRef, useState } from "react"
import Product from "../types/Product"
import ShopContext from "../contexts/ShopContext"
import chime1 from "../assets/chimeSoundFSharp.mp3"
import chime2 from "../assets/chimeSoundC.mp3"
import usePlayer from "../hooks/usePlayer"
import wallpaper from "../assets/d5-render-fWH71R_-9QM-unsplash.jpg"
import useVW from "../hooks/useVW"
import "../styles/Shop.css"

const ProductCard: React.FC<{p: Product}> = ({p}) => {
  const [count, setCount] = useState(0)
  const {cart, placeInCart} = useContext(ShopContext)
  const [playChime1] = usePlayer(chime1)
  const [playChime2] = usePlayer(chime2)

  useEffect(() => {
    const newCart = cart.filter(id => id !== p.id)
    newCart.push(...new Array(count).fill(p.id))
    placeInCart(newCart)
  }, [count, p.id, cart, placeInCart])

  let orderButton: React.JSX.Element
  const increment = () => {
    playChime1()
    setCount(count => count + 1)
  }
  const decrement = () => {
    playChime2()
    setCount(count => Math.max(count - 1, 0))
  }

  if(count < 1) {
    orderButton = (
      <button onClick={increment} className="flex items-center gap-2 justify-center w-full">
        <h5 className="uppercase text-xl">Buy</h5>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
      </button>
    )
  } else {
    orderButton = (
      <div className="flex justify-around w-full">
        <button title="reduce" onClick={decrement}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M360-640v-80h240v80H360ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
        </button>
        <p className="font-black w-20 text-center bg-green-800 bg-opacity-50">{count}</p>
        <button title="add" onClick={increment}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-inherit"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
        </button>
      </div>
    )
  }

  return (
    <article className="grid items-center rounded-xl w-80 shadow hover:shadow-lg shadow-neutral-800 hover:shadow-neutral-800
     bg-white">
      <figure className="flex justify-center rounded-t-xl">
        <img src={p.image} alt={p.title} className="h-60" />
      </figure>
      <div className="grid grid-cols-[3fr_1fr] p-2 h-full rounded-b-xl bg-gradient-to-r from-blue-50 to-blue-200">
        <h4 className="flex items-center text-sm">{p.title}</h4>
        <div className="flex justify-center items-center">
          <p className="bg-amber-200 font-semibold text-blue-900 rounded-full p-2 w-max h-min">${p.price}</p>
        </div>
        <div className="buy-wrapper col-span-2 h-9 text-blue-50 fill-blue-50 m-1 relative overflow-hidden">
          <div className="buy-background bg-gradient-to-r from-green-600 via-lime-500 to-green-600 h-full w-full"></div>
          <div className="z-10 absolute inset-0 grid items-center">{orderButton}</div>
        </div>
      </div>
    </article>
  )
}

const ProductCarousel: React.FC<{products: Product[]}> = ({products}) => {
  const [overflows, setOverflows] = useState(false)
  const [xOffset, setXOffset] = useState(0)
  const carousel = useRef<HTMLDivElement | null>(null)
  const translateIntervalRef = useRef(0)
  const isTranslationForwardsRef = useRef(true)
  const [isEndOfTrack, setIsEndOfTrack] = useState(false)
  const vw = useVW()

  useEffect(() => {
    const {current} = carousel
    if(current) setOverflows(current.clientWidth > (100 * vw))
  }, [vw])

  useEffect(() => {
    const {current} = carousel
    if(!current) return
    const {clientWidth} = current
    setIsEndOfTrack(Math.abs(xOffset) > (clientWidth - 100 * vw + 80))
  }, [vw, xOffset])

  const startTranslateForwards = () => {
    isTranslationForwardsRef.current = true
    translateIntervalRef.current = setInterval(() => {
      setXOffset(x => x - 4)
    }, 16) // 60 FPS
  }

  const startTranslateBackwards = () => {
    isTranslationForwardsRef.current = false
    translateIntervalRef.current = setInterval(() => {
      setXOffset(x => x + 4)
    }, 16)
  }

  const endTranslate = () => {
    if(translateIntervalRef.current) clearInterval(translateIntervalRef.current)
  }

  useEffect(() => {
    if(isTranslationForwardsRef.current) {
      if(isEndOfTrack) endTranslate()
    } else {
      if(xOffset >= 0) endTranslate()
    }
  }, [isEndOfTrack, xOffset, isTranslationForwardsRef])

  return (
    <div className="overflow-hidden relative">
      {overflows && (
        <div className="absolute left-0 top-0 z-20 h-full w-12 py-4">
          <button onMouseDown={startTranslateBackwards} onMouseUp={endTranslate} className="bg-slate-900 shadow shadow-neutral-800 bg-opacity-95 h-full w-full flex justify-center items-center hide-when-disabled" disabled={xOffset > 0} title="scroll left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="fill-white size-8">
              <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
            </svg>
          </button>
        </div>
      )}
      <div className="flex w-max gap-4 py-4" style={{transform: `translateX(${xOffset}px)`}} ref={carousel}>
        {products.map(product => <ProductCard p={product} />)}
      </div>
      {overflows && (
        <div className="absolute right-0 top-0 z-20 h-full w-12 py-4">
          <button onMouseDown={startTranslateForwards} onMouseUp={endTranslate} disabled={isEndOfTrack} className="bg-slate-900 shadow shadow-neutral-800 bg-opacity-95 h-full w-full flex justify-center items-center hide-when-disabled" title="scroll right">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="fill-white size-8">
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

const Shop = () => {
  const { catalog } = useContext(ShopContext)

  interface Category {
    [category: string]: Product[]
  }

  const groupedByCategory = catalog.reduce((categories, product) => {
    if(!categories[product.category]) categories[product.category] = []
    categories[product.category].push(product)
    return categories
  }, {} as Category)

  const categorySections = Object.entries(groupedByCategory).map(([category, products]) => 
    <section className="px-4 pt-8">
      <h3 className="capitalize text-4xl font-bold text-stone-900 mb-2">{category}</h3>
      <ProductCarousel products={products} />
    </section>
  )

  return (
    <div className="bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${wallpaper})`}}>
      <header className="h-96 grid items-center">
        <h1 className="text-9xl uppercase text-slate-950 font-extralight tracking-widest p-4 px-8 backdrop-blur-md w-max rounded-r-full">Shop</h1>
      </header>
      <main className="bg-white bg-opacity-25 backdrop-blur-sm pb-6">
        {categorySections}
      </main>
    </div>
  )
}

export default Shop