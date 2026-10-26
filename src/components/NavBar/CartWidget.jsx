import { useContext } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { CartContext } from "../../context/CartContext"

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext)
  const total = totalQuantity()

  return (
    <div className="inline-flex items-center">
      <span className="sr-only">
        Carrito: {total} {total === 1 ? "producto" : "productos"}
      </span>
      <div className="inline-flex items-center" aria-hidden="true">
        <div className="inline-flex items-center hover:-rotate-12 duration-300">
          <FaShoppingCart size={25} color="grey" />
        </div>
        <div
          className={
            total > 0
              ? "inline-flex items-center rounded-md bg-green-600 px-1 py-1 text-sm font-black text-white ring-2 ring-inset ring-white"
              : "inline-flex items-center rounded-md bg-white px-1 py-1 text-sm font-black text-gray-700 ring-1 ring-inset ring-gray-300"
          }
        >
          {total}
        </div>
      </div>
    </div>
  )
}

export default CartWidget
