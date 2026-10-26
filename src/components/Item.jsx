import { Link } from "react-router-dom"
import formatPrice from "../utils/formatPrice"

const Item = ({ product }) => {
  const image = Array.isArray(product.img) ? product.img[0] : null
  const detailUrl = `/detalle/${product.id}`

  return (
    <div className="m-2 p-2 w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-102 transition duration-200 ease-in-out">
      <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {product.nombre}
      </p>
      <Link to={detailUrl} aria-label={`Ver detalle de ${product.nombre}`}>
        {image ? (
          <img
            className="object-contain h-64 w-full sm:h-80 dark:bg-white"
            src={image}
            alt={product.nombre}
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center bg-gray-100 text-gray-500 sm:h-80 dark:bg-gray-700 dark:text-gray-300">
            Imagen no disponible
          </div>
        )}
      </Link>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Precio: {formatPrice(product.precio)} ARS
      </h5>
      <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Categoría: {product.categoria}
      </h3>
      <div className="flex self-end">
        <Link
          className="inline-flex self-end px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out"
          to={detailUrl}
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  )
}

export default Item
