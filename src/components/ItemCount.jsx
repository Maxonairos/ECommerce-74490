import { useState  } from "react"
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";

export const ItemCount = ({stock, addProduct}) => {
  const [count, setCount ] = useState(1)

  

  const handleClickDecrement =  ()=>{
    if (count > 1){
      setCount (count-1)
    }
    
  }

  const handleClickIncrement = ()=>{
    if ( count < stock){
      setCount(count+1)
    }
  }

  const handleClickAdd = ()=>{ 
    addProduct(count);
    setCount(1)
  }

  return (
    <div className="w-48 flex-col justify-center rounded-xl bg-grey border">
      <div className='flex justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white underline underline-offset-4'>Cantidad</div>
      <div className="flex justify-center py-2">
        <button className="inline-flex justify-center px-2 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-xl hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleClickDecrement}>{<FaCircleMinus size={30}/>}</button>
        <p className="inline-flex px-8 p-2 justify-center rounded-xl bg-grey border text-justify font-bold">{count}</p>
        <button className="inline-flex items-center p-2 text-sm font-medium text-center text-white bg-seagreen rounded-xl hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleClickIncrement}>{<FaCirclePlus size={30}/>}</button>
        </div>
      
      <div className="flex py-2 justify-center">
      <button className="inline-flex w-38 items-end px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleClickAdd}>Agregar al Carrito</button>
      </div>
      
    </div>
  )
}

export default ItemCount