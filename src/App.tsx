import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import Product from "./types/Product"
import contextTuple from "./types/contextTuple"

const App = () => {
  const [cart, setCart] = useState<number[]>([])
  const [catalog, setCatalog] = useState<Product[]>([])

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => setCatalog(data))
  }, [])

  return <>
    <NavBar cartCount={cart.length} />
    <Outlet context={[cart, setCart, catalog] satisfies contextTuple}/>
    <Footer />
  </>
}

export default App
