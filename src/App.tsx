import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import Product from "./types/Product"
import CartItem from "./types/CartItem"
import ShopContext from "./contexts/ShopContext"

const App = () => {
  const [cart, placeInCart] = useState<CartItem[]>([])
  const [catalog, printCatalog] = useState<Product[]>([])
  useEffect(() => console.log(cart), [cart])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => printCatalog(data))
  }, [])

  return (
    <ShopContext.Provider value={{cart, placeInCart, catalog}}>
      <NavBar />
      <Outlet/>
      <Footer />
    </ShopContext.Provider>
  )
}

export default App
