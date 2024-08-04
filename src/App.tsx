import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import Product from "./types/Product"
import Cart from "./types/Cart"
import ShopContext from "./contexts/ShopContext"

const App = () => {
  const [cart, placeInCart] = useState<Cart>({})
  const [catalog, printCatalog] = useState<Product[]>([])

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
