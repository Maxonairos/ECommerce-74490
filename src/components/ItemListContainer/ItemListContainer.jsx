import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Loading from "../Loading.jsx"
import ItemList from "../ItemList.jsx"
//import { getProducts } from "../../data/data.js"
import { collection , getDocs, query, where } from "firebase/firestore"
import db from "../../db/db.js"

const ItemListContainer = ( { greeting }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { idCategory } = useParams()

  const getProducts = ()=>{
    const collectionName = collection(db, "productos")
    getDocs(collectionName) 
    .then((dataDb)=>{
      const productsDb = dataDb.docs.map((productDb)=>{
        return { id: productDb.id, ...productDb.data() }
        
      })
      setProducts(productsDb)
    })
    .finally(()=>{
      setLoading(false)
    })
  }
const getProductByCategory = () =>{
  const collectionName = collection(db, "productos")
  const q = query(collectionName, where( "categoria", "==", idCategory ))
  getDocs(q)
  .then((dataDb)=>{
    const productsDb = dataDb.docs.map((productDb)=>{
      return { id: productDb.id, ...productDb.data() }
      
    })
    setProducts(productsDb)
  })
  .finally(()=>{
    setLoading(false)
  })
}

useEffect(()=>{
  setLoading(true)
  if(idCategory){
    getProductByCategory()
  } else {
    getProducts()
  }  
},[idCategory])


  return (
    <div className="flex flex-wrap mx-auto max-w-8xl px-2 sm:px-6 lg:px-8 items-center justify-evenly sm:items-stretch sm:justify-center dark:bg-gray-800 dark:border-gray-700 min-h-screen">
      <h1 className="mb-2 text-xl font-normal tracking-tight text-gray-600 dark:text-white">{greeting}</h1>
      {
        loading ? <Loading/>
        :
        <ItemList products={products}/>
      }
        
    </div>
    
  )
}



export default ItemListContainer