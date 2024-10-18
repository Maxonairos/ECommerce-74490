import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { FaDeleteLeft } from "react-icons/fa6"
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
        <div className="flex flex-wrap justify-center ">
            
            <div className="flex flex-col ">
            <h1 className='flex flex-wrap self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Mi Carrito</h1>
            {
                cart.map((productCart)=>(
                    <div className="grid gap-4 grid-cols-6 justify-center m-3 p-2 max-w-6xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-70 " key={productCart.id}>
                        <Link to={`/detalle/${productCart.id}`}>
                        <img className="flex m-1 bg-grey border hover:opacity-50 rounded-md object-contain h-48 w-48 sm:object-scale-down" src={productCart.img[0]} alt="Imagen Producto" />
                        </Link>
                        
                        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{productCart.nombre}</p>
                        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Precio: {productCart.precio}$ ARS</p>
                        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Cantidad: {productCart.quantity}</p>
                        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Precio Parcial: {productCart.precio * productCart.quantity}$ ARS</p>
                        <button onClick={()=>modalWarningProduct(productCart.id)}>{<FaDeleteLeft className="hover:scale-105 transition delay-100 duration-200 ease-in-out" size={40} color="seagreen"/>}</button>
                    </div>
                ))
            }
            <div>
                {
                    cart==0 ? <CartEmpty/>
                    : 
                    <CartResume/>
                }
                
            </div>
            
            </div>
        </div>
    )
}

export default Cart