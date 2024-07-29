import React from "react"
import Product from "./Product"
import CartItem from "./CartItem"

type ShopContextInterface = {
  cart: CartItem[],
  placeInCart: React.Dispatch<React.SetStateAction<CartItem[]>>,
  catalog: Product[]
}

export default ShopContextInterface