import { createContext } from "react";
import ShopContextInterface from "../types/ShopContextInterface";

const ShopContext = createContext<ShopContextInterface>({cart: [], placeInCart: () => {}, catalog: []})

export default ShopContext