import { useOutletContext } from "react-router-dom"
import contextTuple from "../types/contextTuple"
import { useEffect } from "react"

const Shop = () => {
  const [cart, setCart, catalog] = useOutletContext<contextTuple>()
  useEffect(() => {
    console.log(catalog)
  }, [catalog])
  return null
}
export default Shop