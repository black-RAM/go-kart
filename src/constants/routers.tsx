import App from '../App.tsx'
import LandingPage from '../components/Landing.tsx'
import Shop from '../components/Shop.tsx'
import { RouteObject } from "react-router-dom"
import ProductPage from '../components/ShopComponents/ProductPage.tsx'

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
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
      }
    ]
  }
]

export default routes