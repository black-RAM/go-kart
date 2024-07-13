import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

const App = () => {
  const cart = 1

  return <>
    <NavBar cart={cart} />
    <Outlet />
    <Footer />
  </>
}

export default App
