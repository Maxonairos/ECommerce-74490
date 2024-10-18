import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import Swal from "sweetalert2"

const CartResume = () => {
    const {totalPriceCart, deleteCart, totalQuantity} = useContext(CartContext)

    const modalWarningAll =()=>{
      Swal.fire({
          icon: "question",
          title: "Seguro que quieres Eliminar el carrito?",
          text: "Tendrás que agregar todos los productos nuevamente luego",
          confirmButtonColor: "#00916E",
          confirmButtonText: "Vaciar Carrito",
          focusCancel: true,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
      }).then((resultado)=>{
          if (resultado.isConfirmed) {
              deleteCart() 
          }
      })
  }

  return (
    <div className="m-3 p-2 max-w-6xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-70 ">
        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Precio Total: {totalPriceCart()} ARS</p>
        <p className='self-center mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Total: {totalQuantity()} Productos</p>
        <button className="inline-flex self-end px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={modalWarningAll} >Vaciar Carrito</button>
    </div>
  )
}

export default CartResume