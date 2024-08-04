import React from "react"
import Product from "./Product"
import Cart from "./Cart"

type ShopContextInterface = {
  cart: Cart,
  placeInCart: React.Dispatch<React.SetStateAction<Cart>>,
  catalog: Product[]
}

export default ShopContextInterface