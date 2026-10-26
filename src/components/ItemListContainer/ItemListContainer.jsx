import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "../Loading.jsx"
import ItemList from "../ItemList.jsx"
import { collection, getDocs, query, where } from "firebase/firestore"
import db from "../../db/db.js"

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const { idCategory } = useParams()

  useEffect(() => {
    let isActive = true

    setLoading(true)
    setError(null)
    setProducts([])

    const collectionRef = collection(db, "productos")
    const productsQuery = idCategory
      ? query(collectionRef, where("categoria", "==", idCategory))
      : collectionRef

    getDocs(productsQuery)
      .then((dataDb) => {
        if (!isActive) return

        const productsDb = dataDb.docs.map((productDb) => ({
          id: productDb.id,
          ...productDb.data()
        }))

        setProducts(productsDb)
      })
      .catch((requestError) => {
        if (!isActive) return
        console.error("No se pudieron obtener los productos:", requestError)
        setError("No pudimos cargar los productos. Revisá tu conexión e intentá nuevamente.")
      })
      .finally(() => {
        if (isActive) setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [idCategory, reloadKey])

  return (
    <div className="flex flex-wrap mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 items-center justify-evenly sm:items-stretch sm:justify-center dark:bg-gray-800 dark:border-gray-700 min-h-screen">
      {greeting && (
        <h1 className="w-full mb-2 text-xl font-normal tracking-tight text-gray-600 dark:text-white">
          {greeting}
        </h1>
      )}

      {idCategory && !loading && !error && (
        <h1 className="w-full mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
          {idCategory}
        </h1>
      )}

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="w-full max-w-xl rounded-lg border border-red-200 bg-white p-6 text-center shadow dark:border-red-800 dark:bg-gray-800">
          <p className="mb-4 text-gray-700 dark:text-gray-200">{error}</p>
          <button
            type="button"
            className="rounded-lg bg-gradient-to-r from-green-500 to-seagreen px-4 py-2 font-medium text-white transition hover:bg-green-800"
            onClick={() => setReloadKey((currentKey) => currentKey + 1)}
          >
            Reintentar
          </button>
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  )
}

export default ItemListContainer
