import React, { useContext, useEffect, useState } from "react"
import Product from "../types/Product"
import ShopContext from "../contexts/ShopContext"
import "../styles/Shop.css"

const ProductCard: React.FC<{p: Product}> = ({p}) => {
  const [count, setCount] = useState(0)
  const {cart, placeInCart} = useContext(ShopContext)

  useEffect(() => {
    const newCart = cart.filter(id => id !== p.id)
    newCart.push(...new Array(count).fill(p.id))
    placeInCart(newCart)
  }, [count, p.id, cart, placeInCart])

  let orderButton: React.JSX.Element
  const increment = () => setCount(count => count + 1)
  const decrement = () => setCount(count => Math.max(count - 1, 0))

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
    <article className="grid items-center rounded-lg w-80 shadow hover:shadow-lg">
      <figure className="flex justify-center bg-white rounded-t-lg">
        <img src={p.image} alt={p.title} className="h-60" />
      </figure>
      <div className="grid grid-cols-[3fr_1fr] p-2 h-full rounded-b-lg bg-gradient-to-r from-blue-50 to-blue-200">
        <h4 className="flex items-center">{p.title}</h4>
        <div className="flex justify-center items-center">
          <p className="bg-amber-200 font-semibold text-blue-900 rounded-full p-2 w-max h-min">${p.price}</p>
        </div>
        <div className="buy-wrapper col-span-2 h-9 bg-gradient-to-r bg-right from-green-600 via-lime-400 to-green-600 text-blue-50 fill-blue-50 m-1 grid items-center">
          {orderButton}
        </div>
      </div>
    </article>
  )
}

const Shop = () => {
  const { catalog } = useContext(ShopContext)
  
  const groupedByCategory = catalog.reduce((categories, product) => {
    if(!categories[product.category]) categories[product.category] = []
    categories[product.category].push(product)
    return categories
  }, {} as {[category: string]: Product[]})

  const categorySections = Object.entries(groupedByCategory).map(([category, products]) => 
    <section className="p-4">
      <h3 className="capitalize text-3xl font-bold text-slate-800">{category}</h3>
      <div className="overflow-y-scroll">
        <div className="flex w-max gap-4 py-4">
          {products.map(product => <ProductCard p={product} />)}
        </div>
      </div>
    </section>
  )

  return (
    <main>
      {categorySections}
    </main>
  )
}

export default Shop