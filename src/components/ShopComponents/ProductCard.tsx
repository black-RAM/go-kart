import usePlayer from "../../hooks/usePlayer"
import Product from "../../types/Product"
import OrderButton from "./OrderButton"
import { Link } from "react-router-dom"
import woosh from "../../assets/fast-whoosh-118248.mp3"

const ProductCard: React.FC<{p: Product}> = ({p}) => {
  const [playWoosh] = usePlayer(woosh)

  return (
    <article className="grid items-center rounded-xl w-56 sm:w-80 shadow hover:shadow-lg shadow-neutral-800 hover:shadow-neutral-800
      bg-white">
      <figure className="flex justify-center rounded-t-xl p-1 overflow-hidden" onClick={playWoosh}>
        <img src={p.image} alt={p.title} className="h-40 sm:h-60 hover:scale-105 transition-transform " />
      </figure>
      <div className="grid grid-cols-[1fr_min-content] p-2 h-full rounded-b-xl bg-gradient-to-r from-blue-50 to-blue-200">
        <h4 className="flex items-center text-sm text-blue-900 underline hover:text-blue-950">
          <Link to={String(p.id)}>
            {p.title}
          </Link>
        </h4>
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
  )
}

export default ProductCard