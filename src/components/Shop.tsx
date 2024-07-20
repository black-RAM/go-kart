import React, { useContext, useEffect, useState } from "react"
import Product from "../types/Product"
import ShopContext from "../contexts/ShopContext"

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
    orderButton = <button title="add to cart" onClick={increment}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-slate-600"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
    </button>
  } else {
    orderButton = <div>
      <button title="reduce" onClick={decrement}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-slate-600"><path d="M360-640v-80h240v80H360ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
      </button>
      <p>{count}</p>
      <button title="add" onClick={increment}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-slate-600"><path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/></svg>
      </button>
    </div>
  }

  return (
    <article>
      <img src={p.image} alt={p.description} />
      <h4>{p.title}</h4>
      <p>${p.price}</p>
      {orderButton}
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
    <section>
      <h3 className="capitalize">{category}</h3>
      {products.map(product => <ProductCard p={product} />)}
    </section>
  )

  return (
    <main>
      {categorySections}
    </main>
  )
}

export default Shop