import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import CartResume from "./CartResume"
import CartEmpty from "./CartEmpty"
import Swal from "sweetalert2"
import RemoveButton from "./RemoveButton"
import formatPrice from "../../utils/formatPrice"

const Cart = () => {
    const { cart, deleteProductInCart } = useContext(CartContext)

    const modalWarningProduct = (value) => {
        Swal.fire({
            icon: "question",
            title: "¿Seguro que querés eliminar el producto del carrito?",
            text: "Tendrás que agregarlo nuevamente luego",
            confirmButtonColor: "#00916E",
            confirmButtonText: "Eliminar",
            focusCancel: true,
            showCancelButton: true,
            cancelButtonText: "Cancelar"
        }).then((resultado) => {
            if (resultado.isConfirmed) {
                deleteProductInCart(value)
            }
        })
    }

    return (
        <div className="flex flex-wrap justify-center min-h-screen">
            <div className="flex flex-col w-full max-w-6xl p-4">
                <h1 className="flex flex-wrap self-center mb-4 text-xl font-bold tracking-tight text-gray-700 dark:text-white">
                    Mi Carrito
                </h1>

                {cart.map((productCart) => {
                    const image = Array.isArray(productCart.img) ? productCart.img[0] : null
                    const quantity = Number(productCart.quantity) || 0
                    const price = Number(productCart.precio) || 0

                    return (
                        <div
                            className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center items-center m-2 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            key={productCart.id}
                        >
                            <Link
                                className="flex self-center justify-center"
                                to={`/detalle/${productCart.id}`}
                                aria-label={`Ver detalle de ${productCart.nombre}`}
                            >
                                {image ? (
                                    <img
                                        className="flex justify-center m-1 bg-white border hover:opacity-50 rounded-md object-contain h-36 w-36 sm:object-scale-down"
                                        src={image}
                                        alt={productCart.nombre}
                                    />
                                ) : (
                                    <div className="flex h-36 w-36 items-center justify-center rounded-md bg-gray-100 text-center text-sm text-gray-500">
                                        Imagen no disponible
                                    </div>
                                )}
                            </Link>
                            <div className="content-center">
                                <h2 className="flex self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    {productCart.nombre}
                                </h2>
                            </div>
                            <div className="content-center">
                                <h2 className="flex self-center justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Precio
                                </h2>
                                <p className="flex self-center justify-center mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                                    {formatPrice(price)} ARS
                                </p>
                            </div>
                            <div className="content-center">
                                <h2 className="flex self-center justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Cantidad
                                </h2>
                                <p className="flex self-center justify-center mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                                    {quantity}
                                </p>
                            </div>
                            <div className="content-center">
                                <h2 className="flex self-center justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                    Precio Parcial
                                </h2>
                                <p className="flex self-center justify-center mb-2 text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                                    {formatPrice(price * quantity)} ARS
                                </p>
                            </div>
                            <div className="flex self-center justify-center mb-2">
                                <RemoveButton
                                    onClick={() => modalWarningProduct(productCart.id)}
                                    productName={productCart.nombre}
                                />
                            </div>
                        </div>
                    )
                })}

                <div className="w-full dark:bg-gray-800 dark:border-gray-700">
                    {cart.length === 0 ? <CartEmpty /> : <CartResume />}
                </div>
            </div>
        </div>
    )
}

export default Cart
