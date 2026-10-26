import { useEffect, useMemo, useState } from "react"
import ItemCount from "./ItemCount.jsx"
import ItemFinishBuy from "./ItemFinishBuy.jsx"
import formatPrice from "../utils/formatPrice.js"

const ItemDetail = ({ product, addProduct, hideItemCount, removeButtonFinishBuy }) => {
  const images = useMemo(
    () => (Array.isArray(product.img) ? product.img.filter(Boolean) : []),
    [product.img]
  )
  const [currentImage, setCurrentImage] = useState(images[0] || "")

  useEffect(() => {
    setCurrentImage(images[0] || "")
  }, [images])

  const alternativeImages = images.filter((image) => image !== currentImage)
  const stock = Number(product.cantidad) || 0

  return (
    <div className="flex justify-center w-full max-w-7xl mx-auto p-2">
      <div className="justify-center m-3 p-2 w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.nombre}
        </h2>

        {(product.marca || product.categoria) && (
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            {product.marca && <span>Marca: {product.marca}</span>}
            {product.marca && product.categoria && <span> · </span>}
            {product.categoria && <span>Categoría: {product.categoria}</span>}
          </p>
        )}

        <div className="justify-center flex">
          {currentImage ? (
            <img
              className="object-contain h-96 max-w-full w-auto bg-gray-100 border hover:scale-102 transition delay-100 duration-200 ease-in-out dark:bg-white"
              src={currentImage}
              alt={product.nombre}
            />
          ) : (
            <div className="flex h-96 w-full items-center justify-center bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300">
              Imagen no disponible
            </div>
          )}
        </div>

        <div className="justify-center flex flex-wrap">
          {alternativeImages.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              aria-label={`Ver imagen de ${product.nombre}`}
              className="m-1 rounded-md border bg-gray-100 hover:opacity-50 dark:bg-white"
              onClick={() => setCurrentImage(image)}
            >
              <img
                className="object-contain h-48 w-48 sm:object-scale-down"
                alt={`Imagen alternativa de ${product.nombre}`}
                src={image}
              />
            </button>
          ))}
        </div>

        <div>
          <h2 className="flex self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Precio
          </h2>
          <p className="mb-2 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
            {formatPrice(product.precio)} ARS
          </p>
        </div>

        <div>
          <h2 className="flex self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Descripción
          </h2>
          <p className="mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
            {product.descripcion}
          </p>
        </div>

        <div>
          <h2 className="flex self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Stock
          </h2>
          <p
            className={`mb-2 text-lg font-medium tracking-tight ${
              stock > 0 ? "text-gray-900 dark:text-white" : "text-red-600 dark:text-red-400"
            }`}
          >
            {stock > 0 ? `${stock} unidades` : "Sin stock disponible"}
          </p>
        </div>

        {hideItemCount ? (
          <ItemFinishBuy removeButtonFinishBuy={removeButtonFinishBuy} />
        ) : (
          <ItemCount stock={stock} addProduct={addProduct} />
        )}
      </div>
    </div>
  )
}

export default ItemDetail
