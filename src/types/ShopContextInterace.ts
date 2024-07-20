import React from "react"
import Product from "./Product"

type ShopContextInterface = {
  cart: number[],
  placeInCart: React.Dispatch<React.SetStateAction<number[]>>,
  catalog: Product[]
}

export default ShopContextInterface