import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

const CartResume = () => {
    const {totalPrice, deleteCart, totalQuantity} = useContext(CartContext)


  return (
    <div>
        <p>Precio Total: {totalPrice()} ARS</p>
        <button onClick={deleteCart} >Vaciar Carrito</button>
    </div>
  )
}

export default CartResume