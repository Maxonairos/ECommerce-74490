import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext)
  const total = totalQuantity()
  return (
    
    <div className="inline-flex items-center">
        <FaShoppingCart size={25} color="grey"/>
        <div className={ total > 0 ? "inline-flex items-center rounded-md bg-green-600 px-1 py-1 text-sm font-black text-white ring-2 ring-inset ring-white-900" 
        :
        "inline-flex items-center rounded-md bg-white px-1 py-1 text-sm font-black text-black-700 ring-1 ring-inset ring-white-900"
        }>{totalQuantity()}</div>
    </div>
  )
}

export default CartWidget