import App from '../App.tsx'
import LandingPage from '../components/Landing.tsx'
import Shop from '../components/Shop.tsx'
import { RouteObject } from "react-router-dom"
import ProductPage from '../components/ShopComponents/ProductPage.tsx'
import Checkout from '../components/Checkout.tsx'
import Error404 from '../components/404.tsx'

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: "shop",
        element: <Shop />,
        children: [
          {
            path: ":id",
            element: <ProductPage />
          }
        ]
      },
      {
        path: "checkout",
        element: <Checkout />
      }
    ]
  }
]

export default routes