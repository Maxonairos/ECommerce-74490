import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getProducts } from "../../data/data.js"
import Loading from "../Loading.jsx"
import ItemList from "../ItemList.jsx"

const ItemListContainer = ( { greeting }) => {
  const [products, setProducts] = useState([])
  const { idCategory } = useParams()


useEffect(()=>{
  getProducts()
  .then((data)=> {
    if(idCategory){
      const filterProducts = data.filter ((product)=> product.categoria === idCategory)
      setProducts(filterProducts)
    } else {
      setProducts(data)
    }
    
  })
  .catch((error)=> {
    console.error(error)
  })
  .finally(()=>{
    console.log("finalizo la promesa")
  })
},[idCategory])


  return (
    <div className="flex flex-wrap mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 items-center justify-evenly sm:items-stretch sm:justify-center">
        <h1 className="mb-2 text-xl font-normal tracking-tight text-gray-600 dark:text-white">{greeting}</h1>
        <ItemList products={products}/>
    </div>
    
  )
}



export default ItemListContainer