import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading"
import { CartContext } from "../context/CartContext"
import ItemDetail from "./ItemDetail"
import ProductNotFound from "./ProductNotFound"
import { doc, getDoc } from "firebase/firestore"
import db from "../db/db.js"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [notFound, setNotFound] = useState(false)
    const [hideItemCount, setHideItemCount] = useState(false)
    const [reloadKey, setReloadKey] = useState(0)
    const { addProductInCart } = useContext(CartContext)
    const { idProduct } = useParams()

    useEffect(() => {
        let isActive = true

        setLoading(true)
        setError(null)
        setNotFound(false)
        setHideItemCount(false)
        setProduct(null)

        if (!idProduct) {
            setNotFound(true)
            setLoading(false)
            return () => {
                isActive = false
            }
        }

        const productRef = doc(db, "productos", idProduct)

        getDoc(productRef)
            .then((snapshot) => {
                if (!isActive) return

                if (!snapshot.exists()) {
                    setNotFound(true)
                    return
                }

                setProduct({ id: snapshot.id, ...snapshot.data() })
            })
            .catch((requestError) => {
                if (!isActive) return
                console.error("No se pudo obtener el producto:", requestError)
                setError("No pudimos cargar el producto. Revisá tu conexión e intentá nuevamente.")
            })
            .finally(() => {
                if (isActive) setLoading(false)
            })

        return () => {
            isActive = false
        }
    }, [idProduct, reloadKey])

    const addProduct = (count) => {
        if (!product) return

        const productCart = { ...product, quantity: count }
        const wasAdded = addProductInCart(productCart, count)

        if (wasAdded) {
            setHideItemCount(true)
        }
    }

    const removeButtonFinishBuy = () => {
        setHideItemCount(false)
    }

    if (loading) return <Loading />

    if (notFound) return <ProductNotFound />

    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="max-w-xl rounded-lg border border-red-200 bg-white p-6 text-center shadow dark:border-red-800 dark:bg-gray-800">
                    <h1 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        Ocurrió un error
                    </h1>
                    <p className="mb-5 text-gray-700 dark:text-gray-200">{error}</p>
                    <button
                        type="button"
                        className="rounded-lg bg-gradient-to-r from-green-500 to-seagreen px-4 py-2 font-medium text-white transition hover:bg-green-800"
                        onClick={() => setReloadKey((currentKey) => currentKey + 1)}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <ItemDetail
            product={product}
            addProduct={addProduct}
            hideItemCount={hideItemCount}
            removeButtonFinishBuy={removeButtonFinishBuy}
        />
    )
}

export default ItemDetailContainer
