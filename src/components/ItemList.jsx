import { Link } from "react-router-dom"
import Item from "./Item"

const ItemList = ({ products }) => {
  if (!products.length) {
    return (
      <div className="w-full max-w-2xl rounded-xl border bg-white p-10 text-center shadow dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          No hay productos para mostrar
        </h2>
        <p className="mb-6 text-gray-600 dark:text-gray-200">
          Probá con otra categoría o volvé al inicio para ver el catálogo completo.
        </p>
        <Link
          className="inline-flex rounded-lg bg-gradient-to-r from-green-500 to-seagreen px-4 py-2 font-medium text-white transition hover:bg-green-800"
          to="/"
        >
          Ver todos los productos
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-evenly sm:items-stretch sm:justify-center max-h-fit">
      {products.map((product) => (
        <Item product={product} key={product.id} />
      ))}
    </div>
  )
}

export default ItemList
