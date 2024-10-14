import { useState, useEffect } from "react"
import { getProduct } from "../data/data"
import ItemDetail from "./ItemDetail"
import { useParams } from "react-router-dom"
import Loading from "./Loading"
import { getProductApi } from "../utils/fetchApi"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState ({})
    const [loading, setLoading] = useState(true)
    const { idProduct } = useParams()

    useEffect ( ()=>{
        setLoading(true)

        getProductApi(idProduct)
        .then((data)=> setProduct(data))
        .catch((error) => console.error(error))
        .finally(()=>{
          setLoading(false)
        })
    }, [idProduct])

    //console.log(product)
  return (
    <>
      {
        loading ? <Loading/>
        :
        
        <ItemDetail product={product}/>
      }
    </>
    
  )
}

export default ItemDetailContainer