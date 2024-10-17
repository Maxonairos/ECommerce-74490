//debe tener boton para aumentar y restar, no debe llegar a 0 ni en numero en negativo

//pasar como prop el stock maximo
//boton agregar al carrito, mostrar el boton actual del contador
import { useState, useContext  } from "react"

export const ItemCount = ({stock, addProduct}) => {
  const [count, setCount ] = useState(1)
  //const { addProductInCart  } = useContext(CartContext)

  

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
    <div className="w-40 flex-col justify-center rounded-xl bg-grey border">
      <div className='flex justify-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white underline underline-offset-4'>Cantidad</div>
      <div className="flex justify-center py-2">
        <button className="inline-flex justify-center px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleClickDecrement}>-</button>
        <p className="inline-flex px-8 py-2 justify-center rounded-xl bg-grey border text-justify font-bold">{count}</p>
        <button className="inline-flex items-end px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleClickIncrement}>+</button>
        </div>
      
      <div className="flex py-2 justify-center">
      <button className="inline-flex items-end px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleClickAdd}>Agregar al Carrito</button>
      </div>
      
    </div>
  )
}

export default ItemCount