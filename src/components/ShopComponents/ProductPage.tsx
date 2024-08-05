import { useContext } from "react"
import ShopContext from "../../contexts/ShopContext"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import OrderButton from "./OrderButton"
import usePlayer from "../../hooks/usePlayer"
import woosh from "../../assets/fast-whoosh-118248.mp3"

const FullStar = () => 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-yellow-200">
    <path d="m 0 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z"/>
  </svg>

const HalfStar = () => 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-yellow-200">
    <path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>
  </svg>

const EmptyStar = () => 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-slate-300">
    <path d="m 0 122ZM233-120l93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Zm247-369Z"/>
  </svg>

const RatingStars: React.FC<{rating: number}> = ({rating}) => {
  const stars: React.ReactNode[] = []

  let remainder = rating
  while(remainder > 0) {
    if(remainder >= 1) {
      stars.push(<FullStar key={remainder} />)
    } else {
      stars.push(<HalfStar key={remainder} />)
    }
    remainder--
  }

  let empty = 5 - rating
  while(empty > 1) {
    stars.push(<EmptyStar key={empty * 2} />)
    empty--
  }

  return <div className="flex">{stars}</div>
}

const ProductPage: React.FC = () => {
  const {catalog} = useContext(ShopContext)
  const {id} = useParams()
  const product = catalog.find(p => p.id == Number(id))

  const navigate = useNavigate()
  const { state } = useLocation()
  const [playWoosh] = usePlayer(woosh)
  const goBack = () => {
    const previous = state || "/shop"
    navigate(previous)
    playWoosh()
  }

  return (
    <main className="product-page bg-stone-900 bg-opacity-25 backdrop-blur grid lg:flex p-8 gap-8">
      {product && <>
      <div className="grid items-center justify-center">
        <button type="button" onClick={goBack} title="go back">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-8 fill-slate-200 transition-transform hover:scale-110">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
          </svg>
        </button>
      </div>
      <div className="rounded-2xl shadow-2xl shadow-white bg-white grid items-center justify-center p-2">
        <img src={product.image} alt={product.description} className="product-image object-contain rounded-2xl" />
      </div>
      <section className="grid items-start gap-y-4">
        <h2 className="text-xl sm:text-2xl text-stone-400 font-light">{product.category}</h2>
        <h1 className="text-4xl sm:text-6xl text-stone-100 font-bold underline">{product.title}</h1>
        <div className="bg-gradient-to-br from-slate-400 to-slate-600 shadow-lg shadow-slate-800 w-max flex gap-1 p-1 rounded-2xl">
          <RatingStars rating={2.5} />
          <p className="text-slate-800">{product.rating.count} Reviews</p>
        </div>
        <div className="flex rounded-3xl product-description">
          <div className="bg-rose-200 text-rose-800 rounded-l-3xl p-1 grid items-center">
            <p>${product.price}</p>
          </div>
          <div className="text-sm sm:text-base rounded-r-3xl p-4 bg-indigo-300 text-indigo-950 product-description">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="bg-rose-600 text-rose-100 fill-rose-100 p-2 rounded grid items-center h-10">
          <OrderButton id={String(product.id)} />
        </div>
      </section>
      </>}
    </main>
  )
}

export default ProductPage