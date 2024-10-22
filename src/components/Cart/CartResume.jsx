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
    const modalInProgress = ()=>{
        Swal.fire({
            icon: "warning",
            title: "Funcionalidad en Desarrollo",
            text: "En breve vas a poder completar tu compra.😀",
            confirmButtonColor: "#00916E"
            })
    }

    return (
    <div className="m-2 p-2 h-36 max-w-6xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-70 ">
        <div>
        <h2 className='inline-flex self-center m-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Precio Total:</h2>
        <div className="inline-flex self-center m-1 text-lg font-normal tracking-tight text-gray-900 dark:text-white">{totalPriceCart()}$ ARS</div>
        </div>
        <div>
            <h2 className='inline-flex self-center m-1 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>Total:</h2>
            <div className='inline-flex self-center m-1 text-lg font-normal tracking-tight text-gray-900 dark:text-white'>{totalQuantity()} Productos </div>
        </div>
        
        <div className="flex flex-wrap justify-evenly m-1 p-1 max-w-6xl bg-white ">
        <button className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={modalWarningAll} >Vaciar Carrito</button>
        <button className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={modalInProgress} >Finalizar mi Compra</button>
        </div>
        
    </div>
    )
}

export default CartResume