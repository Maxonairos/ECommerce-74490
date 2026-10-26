import { useEffect, useState } from "react"
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6"

const ItemCount = ({ stock = 0, addProduct }) => {
  const maxStock = Math.max(0, Number(stock) || 0)
  const [count, setCount] = useState(() => (maxStock > 0 ? 1 : 0))

  useEffect(() => {
    setCount((currentCount) => {
      if (maxStock === 0) return 0
      return Math.min(Math.max(currentCount, 1), maxStock)
    })
  }, [maxStock])

  const handleClickDecrement = () => {
    setCount((currentCount) => Math.max(1, currentCount - 1))
  }

  const handleClickIncrement = () => {
    setCount((currentCount) => Math.min(maxStock, currentCount + 1))
  }

  const handleClickAdd = () => {
    if (count > 0 && count <= maxStock) {
      addProduct(count)
    }
  }

  const outOfStock = maxStock === 0

  return (
    <div className="flex self-center justify-center">
      <div className="w-60 flex-col justify-center rounded-xl bg-gray-100 border dark:bg-gray-700 dark:border-gray-600">
        <div className="flex justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white underline underline-offset-4">
          Cantidad
        </div>
        <div className="flex justify-center py-2">
          <button
            type="button"
            aria-label="Restar una unidad"
            className="inline-flex justify-center px-2 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-xl hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-40 disabled:cursor-not-allowed transition duration-300"
            onClick={handleClickDecrement}
            disabled={count <= 1}
          >
            <FaCircleMinus size={30} />
          </button>
          <p className="inline-flex px-8 p-2 justify-center rounded-xl bg-white border text-justify font-bold dark:bg-white dark:text-black">
            {count}
          </p>
          <button
            type="button"
            aria-label="Sumar una unidad"
            className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-xl hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-40 disabled:cursor-not-allowed transition duration-300"
            onClick={handleClickIncrement}
            disabled={outOfStock || count >= maxStock}
          >
            <FaCirclePlus size={30} />
          </button>
        </div>

        <div className="flex py-2 justify-center">
          <button
            type="button"
            className="inline-flex w-40 justify-center items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 disabled:opacity-40 disabled:cursor-not-allowed transition duration-300 ease-in-out"
            onClick={handleClickAdd}
            disabled={outOfStock || count === 0}
          >
            {outOfStock ? "Sin stock" : "Agregar al Carrito"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItemCount
