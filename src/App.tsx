import logo from "/kart.png"
import shoppingCart from "./assets/shoppingCart.svg"
import "./App.css"

const CarPedal: React.FC<{children: React.ReactNode}> = ({children}) => {
  return (
    <figure className="flex justify-center items-center">
      <div className="w-max py-2 px-4 bg-repeat bg-opacity-75 rounded-sm cursor-pointer rhombus-pattern">
        <div className="backdrop-blur-sm">
          {children}
        </div>
      </div>
    </figure>
  )
}

const App = () => {
  const cart = 1

  return <>
    <nav className="grid grid-cols-[1fr_repeat(2,_2fr)_1fr] items-center w-full bg-gradient-to-r from-indigo-950 via-violet-950 to-indigo-950 text-red-50">
      <figure className="flex justify-center py-2">
        <div className="h-14 bg-red-50 rounded-full p-2">
          <img src={logo} className="h-full" alt="Go Kart logo" />
        </div>
      </figure>      

      <CarPedal>
        <h2>
          <a>Home</a>
        </h2>
      </CarPedal>

      <CarPedal>
        <h2>
          <a>Shop</a>
        </h2>
      </CarPedal>

      <figure className="flex justify-center items-center">
        <img src={shoppingCart} className="h-8" alt="Shopping cart icon" />
        <caption className="bg-indigo-800 w-6 rounded-full" style={{visibility: cart ? "visible" : "hidden"}}>
          {cart}
        </caption>
      </figure>
    </nav>
  </>
}

export default App
