import App from '../App.tsx'
import LandingPage from '../components/Landing.tsx'
import { RouteObject } from "react-router-dom"

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> }
    ]
  }
]

export default routes