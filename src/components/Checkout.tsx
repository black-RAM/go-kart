import { useContext } from "react"
import ShopContext from "../contexts/ShopContext"
import wallpaper from "../assets/google-deepmind-8izdP4Ec9rA-unsplash.jpg"
import "../styles/Checkout.css"
import { Link, useLocation } from "react-router-dom"
import woosh from "../assets/fast-whoosh-118248.mp3"
import usePlayer from "../hooks/usePlayer"
import Product from "../types/Product"

interface CountedProduct extends Product {
  count: number,
  subtotal: number,
}

const Checkout = () => {
  const {pathname} = useLocation()
  const [playWoosh] = usePlayer(woosh)
  const {cart, catalog} = useContext(ShopContext)
  const products = Object.entries(cart)
    .filter(entry => entry[1] > 0)
    .map(([id, count]) => {
      const product = catalog.find(p => p.id == Number(id)) as CountedProduct
      product.count = count
      product.subtotal = product.count * product.price 
      return product
    })
  const total = products.reduce((sum, product) => {
    const sub = product.subtotal
    return sum + sub
  }, 0)
  
  return (
    <main className="checkout-background bg-cover bg-center bg-fixed" style={{backgroundImage: `url(${wallpaper})`}}>
      {
        products.length > 0 ? 
        <div className="grid grid-rows-[repeat(2,max-content)] lg:grid-cols-2 lg:grid-rows-1 items-start py-4 px-8 gap-8">
          <section className="checkout-receipt">
            <hgroup className="flex items-end justify-center border-b-2 border-b-slate-800 pb-2 gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-8 fill-slate-600">
                <path d="M120-80v-800l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v800l-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h480v-80H240v80Zm0-160h480v-80H240v80Zm0-160h480v-80H240v80Zm-40 404h560v-568H200v568Zm0-568v568-568Z"/>
              </svg>
              <h1 className="text-slate-600 text-3xl font-bold">Receipt</h1>
            </hgroup>
            <table>
              <thead className="text-slate-400">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => 
                  <tr key={index} className="border-b border-b-blue-100 shadow">
                    <td>
                      <img src={product.image} alt={product.category} className="size-20 object-contain bg-white" />
                    </td>
                    <td className="text-blue-900 hover:underline">
                      <Link to={`/shop/${product.id}`} state={pathname}>
                        <span onClick={playWoosh}>{product.title}</span>
                      </Link>
                    </td>
                    <td>${product.price}</td>
                    <td>{product.count}</td>
                    <td>${product.subtotal}</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={3}></td>
                  <td className="bg-gradient-to-r from-blue-300 to-blue-400">Total:</td>
                  <td className="bg-gradient-to-r from-blue-400 to-blue-500">${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </section>
          <form className="payment-details">
            <hgroup className="flex items-end justify-center border-b-2 border-b-blue-200 pb-2 gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-8 fill-green-200">
                <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/>
              </svg>
              <h1 className="text-blue-200 text-3xl font-bold">Payment</h1>
            </hgroup>
          </form>
        </div> 
        : 
        <div className="grid justify-center items-center">
          <section className="checkout-receipt mx-6 md:w-[454px]">
            <hgroup className="flex items-end pb-1 gap-1 border-b-2 border-b-red-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-8 md:size-12 fill-red-600 animate-pulse">
                <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
              </svg>
              <h1 className="text-red-800 font-bold text-3xl md:text-5xl">Box, Box, Box!</h1>
            </hgroup>
            <div className="grid p-2 gap-2 font-semibold md:text-xl text-slate-800">
              <p>Oops, your cart is running on empty! Zoom back to the shop page and fuel up with some fantastic finds!</p>
              <Link to="/shop">
                <div className="bg-blue-800 hover:bg-blue-900 text-white p-2 rounded flex justify-center" onClick={playWoosh}>
                  <p>GoKart!</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
        }
    </main>
  )
}

export default Checkout