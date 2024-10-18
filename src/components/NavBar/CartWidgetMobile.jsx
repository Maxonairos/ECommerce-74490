import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


const CartWidgetMobile = () => {
  const { totalQuantity } = useContext(CartContext)

  return (
    
    <div className="inline-flex items-center">
        <FaShoppingCart size={20} color="grey"/>
        <div className="inline-flex items-center rounded-md bg-white text-sm px-2 font-black text-black-700 ring-1 ring-inset ring-white-900">{totalQuantity()}</div>
    </div>
  )
}

export default CartWidgetMobile