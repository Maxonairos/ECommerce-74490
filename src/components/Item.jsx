import { Link } from "react-router-dom"

const Item = ({product}) => {
  return (
      <div className="m-2 p-2 max-w-sm bg-white border border-gray-300 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.nombre}</p>
              <img className="object-contain h-96 w-96" src={product.img[0]}  alt="imagen del producto" />
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Precio: {product.precio}$ ARS</h5>
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Categoria: {product.categoria}</h3>
              <div className='flex self-end'>
              <Link className="inline-flex self-end px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to={`/detalle/${product.id}`}>Ver Detalles</Link>
              </div>
              
              
              
    </div>

  )
}

export default Item


