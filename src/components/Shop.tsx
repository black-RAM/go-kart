import { useContext } from "react"
import ProductListing from "./ShopComponents/ProductListing"
import Product from "../types/Product"
import ShopContext from "../contexts/ShopContext"
import wallpaper from "../assets/d5-render-fWH71R_-9QM-unsplash.jpg"
import "../styles/Shop.css"

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
      <h3 className="capitalize text-3xl sm:text-4xl font-bold text-stone-100 mb-2">{category}</h3>
      <ProductListing products={products} />
    </section>
  )

  return (
    <div className="bg-fixed bg-cover bg-center" style={{backgroundImage: `url(${wallpaper})`}}>
      <header className="h-96 grid items-center">
        <h1 className="text-7xl sm:text-9xl uppercase text-stone-100 font-extralight tracking-widest p-4 px-8 backdrop-blur-md w-max rounded-r-full">Shop</h1>
      </header>
      <main className="bg-stone-900 bg-opacity-25 backdrop-blur-sm pb-6">
        {categorySections}
      </main>
    </div>
  )
}

export default Shop