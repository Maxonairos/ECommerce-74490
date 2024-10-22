import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


const CartWidgetMobile = () => {
  const { totalQuantity } = useContext(CartContext)
  const total = totalQuantity()

  return (
      <div className={ total > 0 ? "inline-flex items-center rounded-md bg-green-600 px-2  text-sm font-black text-white ring-1 ring-inset ring-white-900" 
      :
      "inline-flex items-center rounded-md bg-gray-300 text-sm px-2 font-black text-white-700 ring-1 ring-inset ring-white-900"
      }>{totalQuantity()}</div>
  )
}

export default CartWidgetMobile