import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { FaDeleteLeft } from "react-icons/fa6"
import { Link } from "react-router-dom"


const Cart = () => {
const { cart, totalPrice, totalQuantity, deleteProductInCart, deleteCart } = useContext(CartContext)
    return (
        <div className="flex flex-wrap justify-center ">
            
            <div className="flex flex-col ">
            <h1 className='flex flex-wrap self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Mi Carrito</h1>
            {
                cart.map((productCart)=>(
                    <div className="grid gap-4 grid-cols-6 justify-center m-3 p-2 max-w-6xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-70" key={productCart.id}>
                        <Link to={`/detalle/${productCart.id}`}>
                        <img className="flex m-1 bg-grey border hover:opacity-50 rounded-md object-contain h-48 w-48 sm:object-scale-down" src={productCart.img[0]} alt="Imagen Producto" />
                        </Link>
                        
                        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{productCart.nombre}</p>
                        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Precio: {productCart.precio}</p>
                        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Cantidad: {productCart.quantity}</p>
                        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Precio Parcial: {productCart.precio * productCart.quantity} ARS</p>
                        <button onClick={()=>deleteProductInCart(productCart.id)}>{<FaDeleteLeft size={30} color="seagreen"/>}</button>
                    </div>
                ))
            }
            <div>
                <p>Precio Total: {totalPrice()} ARS</p>
                <button onClick={deleteCart} >Vaciar Carrito</button>
            </div>
            </div>
        </div>
    )
}

export default Cart