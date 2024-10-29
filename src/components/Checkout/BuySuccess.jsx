import { Link } from "react-router-dom"

const BuySuccess = ({orderId}) => {
    return (
        <div>
            <h2>orden enviada correctamente 😀</h2>
            <p>Puedes guardar el numero de seguimiento para obtener información de tu compra</p>
            <p>Orden: {orderId}</p>
            <Link className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to="/">Volver al Inicio</Link>
        </div>
    )
}

export default BuySuccess