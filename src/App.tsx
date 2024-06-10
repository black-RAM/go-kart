import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"

const App = () => {
  const cart = 1

  return <>
    <NavBar cart={cart} />
    <Outlet />
  </>
}

export default App
