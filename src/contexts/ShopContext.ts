import { createContext } from "react";
import ShopContextInterface from "../types/ShopContextInterace";

const ShopContext = createContext<ShopContextInterface>({cart: [], placeInCart: () => {}, catalog: []})

export default ShopContext