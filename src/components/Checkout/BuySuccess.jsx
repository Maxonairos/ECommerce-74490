import { Link } from "react-router-dom"

const BuySuccess = ({ orderId }) => {
    return (
        <div className="max-w-2xl bg-white rounded-lg shadow-md p-8 m-2 dark:bg-gray-800 dark:border-gray-700 border max-h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
                ¡Tu compra fue exitosa! 😀
            </h2>
            <p className="text-xl font-bold text-gray-900 mb-4 dark:text-white">
                Guardá el número de seguimiento para consultar el estado de tu compra.
            </p>
            <p className="inline-flex text-xl font-bold text-gray-900 mb-4 dark:text-white">
                Orden Nº:
            </p>
            <p className="inline-flex break-all text-xl font-medium text-green-600 mb-4">
                {orderId}
            </p>
            <div>
                <Link
                    className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out"
                    to="/"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    )
}

export default BuySuccess
