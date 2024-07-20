import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import Product from "./types/Product"
import ShopContext from "./contexts/ShopContext"

const App = () => {
  const [cart, placeInCart] = useState<number[]>([])
  const [catalog, printCatalog] = useState<Product[]>([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => printCatalog(data))
  }, [])

  return <>
    <NavBar cartCount={cart.length} />
    <ShopContext.Provider value={{cart, placeInCart, catalog}}>
      <Outlet/>
    </ShopContext.Provider>
    <Footer />
  </>
}

export default App
