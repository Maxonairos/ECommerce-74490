import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

const CartWidgetMobile = () => {
  const { totalQuantity } = useContext(CartContext)
  const total = totalQuantity()

  return (
    <>
      <div
        className={
          total > 0
            ? "inline-flex items-center rounded-md bg-green-600 px-2 text-sm font-black text-white ring-1 ring-inset ring-white"
            : "inline-flex items-center rounded-md bg-gray-300 px-2 text-sm font-black text-gray-700 ring-1 ring-inset ring-gray-400"
        }
        aria-hidden="true"
      >
        {total}
      </div>
      <span className="sr-only">
        {total} {total === 1 ? "producto" : "productos"}
      </span>
    </>
  )
}

export default CartWidgetMobile
