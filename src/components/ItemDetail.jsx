import { useState } from "react"
import ItemCount from "./ItemCount.jsx"

const ItemDetail = ({ product , addProduct }  ) => {
  const [currentImage , setCurrentImage ] = useState(product.img[0])

  const images = product.img.filter ( (imagen) => imagen !== currentImage )

  return (
    <div className='main flex justify-center max-w-9xl'>
      <div className="justify-center m-3 p-2 max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white underline underline-offset-4'>{product.nombre}</h2>
              <div className="justify-center flex">
          <img className="object-contain h-96 w-auto bg-grey border" src={currentImage} alt="Imagen de producto" />
        </div>
        <div className="justify-center flex flex-wrap">
          {
            images.map ((imagen)=>(
              <img className="flex flex-wrap m-1 bg-grey border hover:opacity-50 rounded-md object-contain h-48 w-48 sm:object-scale-down" alt="Imagen alternativa del Producto" src={imagen} key={imagen} onClick={()=> setCurrentImage(imagen)}/> 
            ))
          }
        </div>
        <p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>Precio: {product.precio}$ ARS</p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Descripción: {product.descripcion}</p>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Stock: {product.cantidad} Unidades</p>
        <ItemCount stock={product.cantidad} addProduct={addProduct}/>
      </div>
    </div>
  )
}

export default ItemDetail