import { useContext } from "react"
import ShopContext from "../../contexts/ShopContext"
import { useParams } from "react-router-dom"

const ProductPage: React.FC = () => {
  const {catalog} = useContext(ShopContext)
  const {id} = useParams()
  const product = catalog.find(p => p.id == Number(id))
  return <p>{JSON.stringify(product)}</p>
}
export default ProductPage