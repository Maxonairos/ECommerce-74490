import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";


const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext)

  return (
    
    <div className="inline-flex items-center">
        <FaShoppingCart size={25} color="gray"/>
        <div className="inline-flex items-center rounded-md bg-success-subtle px-1 py-1 text-xs font-medium text-black-700 ring-1 ring-inset ring-green-700/20">{totalQuantity()}</div>
    </div>
  )
}

export default CartWidget