import { Link } from "react-router-dom"

const ItemFinishBuy = ({removeButtonFinishBuy }) => {
    const handleClickKeepAdd = ()=>{
        removeButtonFinishBuy()
    }

    return (
            <div className="flex flex-wrap justify-evenly">
                    <Link to="/cart" className="inline-flex w-38 items-center  h-10 m-2 px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out">Terminar mi Compra</Link>
                    <button className="inline-flex w-38 items-center h-10 m-2 px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out" onClick={handleClickKeepAdd}>Seguir Agregando</button>
            </div>        
    )
}

export default ItemFinishBuy