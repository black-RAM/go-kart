import Product from "../../types/Product"
import OrderButton from "./OrderButton"
import { Link } from "react-router-dom"

const ProductCard: React.FC<{p: Product}> = ({p}) => 
  <article className="grid items-center rounded-xl w-56 sm:w-80 shadow hover:shadow-lg shadow-neutral-800 hover:shadow-neutral-800
    bg-white">
    <Link to={String(p.id)}>
      <figure className="flex justify-center rounded-t-xl p-1 overflow-hidden">
        <img src={p.image} alt={p.title} className="h-40 sm:h-60 hover:scale-105 transition-transform " />
      </figure>
    </Link>
    <div className="grid grid-cols-[1fr_min-content] p-2 h-full rounded-b-xl bg-gradient-to-r from-blue-50 to-blue-200">
      <h4 className="flex items-center text-sm">{p.title}</h4>
      <div className="flex justify-center items-center">
        <p className="bg-amber-200 text-blue-950 rounded-full p-2 w-max h-min text-sm sm:text-base">${p.price}</p>
      </div>
      <div className="buy-wrapper col-span-2 h-9 text-blue-50 fill-blue-50 m-1 relative overflow-hidden">
        <div className="buy-background bg-gradient-to-r from-green-600 via-lime-500 to-green-600 h-full w-full"></div>
        <div className="z-10 absolute inset-0 grid items-center">
          <OrderButton id={String(p.id)} />
        </div>
      </div>
    </div>
  </article>

export default ProductCard