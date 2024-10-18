import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading"
import { getProduct } from "../data/data.js"
import { CartContext } from "../context/CartContext"
import ItemDetail from "./ItemDetail"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState ({})
    const [loading, setLoading] = useState(true)
    const { addProductInCart } = useContext(CartContext)
    const { idProduct } = useParams()

    const addProduct = (count)=> {
      const productCart = {...product, quantity : count}

      addProductInCart(productCart , count)
    }
    useEffect ( ()=>{
        setLoading(true)

        getProduct(idProduct)
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
        
        <ItemDetail product={product} addProduct={addProduct}/>
      }
    </>
    
  )
}

export default ItemDetailContainer