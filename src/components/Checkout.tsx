import { useContext } from "react"
import ShopContext from "../contexts/ShopContext"
import wallpaper from "../assets/google-deepmind-8izdP4Ec9rA-unsplash.jpg"
import "../styles/Checkout.css"
import { Link, useLocation } from "react-router-dom"
import woosh from "../assets/fast-whoosh-118248.mp3"
import rev from "../assets/revving.mp3"
import usePlayer from "../hooks/usePlayer"
import Product from "../types/Product"
import processing from "../assets/computer-processing-sound-effects-short-click-select-01-122134.mp3"

interface CountedProduct extends Product {
  count: number,
  subtotal: number,
}

const Checkout = () => {
  const {pathname} = useLocation()
  const [playWoosh] = usePlayer(woosh)
  const [playRev] = usePlayer(rev)
  const [playProcessing] = usePlayer(processing)
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

  const disappointUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert("Happy April Fools! This was all a joke to show off my front-end web development skills!")
  }
  
  return (
    <main className="checkout-background bg-cover bg-center bg-fixed" style={{backgroundImage: `url(${wallpaper})`}}>
      {
        products.length > 0 ? 
        <div className="grid grid-rows-[repeat(2,max-content)] lg:grid-cols-2 lg:grid-rows-1 items-start p-2 sm:py-4 sm:px-8 gap-8">
          <section className="checkout-receipt">
            <hgroup className="flex items-end justify-center border-b-2 border-b-slate-800 pb-2 gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-8 fill-slate-600">
                <path d="M120-80v-800l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v800l-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h480v-80H240v80Zm0-160h480v-80H240v80Zm0-160h480v-80H240v80Zm-40 404h560v-568H200v568Zm0-568v568-568Z"/>
              </svg>
              <h1 className="text-slate-600 text-3xl font-bold">Receipt</h1>
            </hgroup>
            <table className="w-full">
              <thead className="text-slate-400 text-xs sm:text-sm">
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-base">
                {products.map((product, index) => 
                  <tr key={index} className="border-b border-b-blue-100 shadow">
                    <td>
                      <img src={product.image} alt={product.category} className="size-20 object-contain bg-white" />
                    </td>
                    <td className="text-blue-900 underline hover:text-blue-950">
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
              <tfoot className="text-xs sm:text-base">
                <tr>
                  <td colSpan={3}></td>
                  <td className="bg-gradient-to-r from-blue-300 to-blue-400">Total:</td>
                  <td className="bg-gradient-to-r from-blue-400 to-blue-500">${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </section>

          <section className="checkout-payment">
            <hgroup className="flex items-end justify-center border-b-2 border-b-blue-200 pb-2 mb-4 gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-8 fill-green-200">
                <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/>
              </svg>
              <h2 className="text-blue-200 text-3xl font-bold">Payment</h2>
            </hgroup>

            <form onSubmit={disappointUser} className="grid grid-cols-2 gap-x-4 gap-y-2">
              <h3 className="form-section-header">Contact</h3>
              <div>
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" name="first-name" required />
              </div>
              <div>
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" name="last-name" required />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" required />
              </div>
              
              <h3 className="form-section-header">Delivery Details</h3>
              <div>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" name="address" required />                
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" required />                
              </div>
              <div>
                <label htmlFor="state">State</label>
                <input type="text" id="state" name="state" required />
              </div>
              <div>
                <label htmlFor="zip">ZIP Code</label>
                <input type="text" id="zip" name="zip" required />                
              </div>
              
              <h3 className="form-section-header">Credit Card</h3>
              <input type="text" id="cc-number" name="cc-number" placeholder="Card Number" required />
              <input type="text" id="cc-expiry" name="cc-expiry" placeholder="Expiry Date (MM/YY)" required />
              <input type="text" id="cc-cvc" name="cc-cvc" placeholder="CVC" required className="col-span-2" />
              
              <label htmlFor="notes" className="form-section-header">Additional Notes</label>
              <textarea id="notes" name="notes" className="col-span-2"></textarea>
              <button type="submit" onClick={playProcessing} className="col-span-2 p-2 rounded bg-gradient-to-r from-green-400 to-green-600 shadow shadow-black hover:shadow-md hover:shadow-black tracking-widest flex gap-1 justify-center focus:border-none focus:outline-none focus:outline-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="size-6 fill-black">
                  <path d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z"/>
                </svg>
                Place Order
              </button>
            </form>
          </section>
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
                <div className="bg-blue-800 hover:bg-blue-900 text-white p-2 rounded flex justify-center" onClick={playRev}>
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