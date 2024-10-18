import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { FaTrash } from "react-icons/fa6"
import { Link } from "react-router-dom"
import CartResume from "./CartResume"
import CartEmpty from "./CartEmpty"
import Swal from "sweetalert2"

const Cart = () => {
    const { cart, deleteProductInCart } = useContext(CartContext)
    
    const modalWarningProduct =(value)=>{
        Swal.fire({
            icon: "question",
            title: "Seguro que quieres Eliminar el Producto del carrito?",
            text: "Tendrás que agregarlo nuevamente luego",
            confirmButtonColor: "#00916E",
            confirmButtonText: "Eliminar",
            focusCancel: true,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
        }).then((resultado)=>{
            if (resultado.isConfirmed) {
                deleteProductInCart(value) 
            }
        })
    }
    
    

    return (
        <div className="flex flex-wrap justify-center">
            <div className="flex flex-col w-full max-w-6xl p-4">
                <h1 className='flex flex-wrap self-center mb-4 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>
                    Mi Carrito
                </h1>
                {
                    cart.map((productCart) => (
                        <div
                            className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-center m-3 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                            key={productCart.id}
                        >
                            <Link className="flex self-center justify-center" to={`/detalle/${productCart.id}`}>
                                <img className="flex justify-center m-1 bg-white border hover:opacity-50 rounded-md object-contain h-48 w-48 sm:object-scale-down"
                                    src={productCart.img[0]}
                                    alt="Imagen Producto"/>
                            </Link>
                            
                            <p className='flex self-center justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{productCart.nombre}</p>
                            <p className='flex self-center justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Precio: {productCart.precio}$ ARS</p>
                            <p className='flex self-center justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Cantidad: {productCart.quantity}</p>
                            <p className='flex self-center justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Precio Parcial: {productCart.precio * productCart.quantity}$ ARS</p>
                            <div className="flex self-center justify-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'" >
                                <FaTrash className="self-center mb-2 hover:scale-105 transition delay-100 duration-200 ease-in-out" size={30} color="seagreen" onClick={() => modalWarningProduct(productCart.id)}/>
                            </div>
                        </div>
                    ))
                }
                <div className="w-full">
                    {
                        cart.length === 0 ? <CartEmpty /> : <CartResume />
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart