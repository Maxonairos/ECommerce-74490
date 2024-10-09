import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
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
    <div>
        <h1>{greeting}</h1>
        {
          Loading === true ? 
          <Loading/>
          :
          <ItemList products={products} />
        }

        
    </div>
  )
}



export default ItemListContainer