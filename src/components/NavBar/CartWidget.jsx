import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
  return (
    <div className="cartwidget bg-success-subtle hover:bg-gray-700 rounded-md px-2">
        <FaShoppingCart size={30} color="gray"/>
    </div>
  )
}

export default CartWidget