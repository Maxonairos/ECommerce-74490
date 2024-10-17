import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

const Cart = () => {
const { cart, totalPrice, deleteProductInCart, deleteCart } = useContext(CartContext)

    return (
        <div>
            <h1>Mi Carrito</h1>
            {
                cart.map((productCart)=>(
                    <div key={productCart.id}>
                        <img className="flex flex-wrap m-1 bg-grey border hover:opacity-50 rounded-md object-contain h-48 w-48 sm:object-scale-down" src={productCart.img[0]} alt="Imagen Producto" />
                        <p>Nombre: {productCart.nombre}</p>
                        <p>Precio: {productCart.precio}</p>
                        <p>Cantidad: {productCart.quantity}</p>
                        <p>Precio Parcial: {productCart.precio * productCart.quantity}</p>
                        <button onClick={()=>deleteProductInCart(productCart.id)}>Eliminar Producto</button>
                    </div>
                ))
            }
            <div>
                <p>Precio Total: {totalPrice()} ARS</p>
                <button onClick={deleteCart} >Vaciar Carrito</button>
            </div>
        </div>
    )
}

export default Cart