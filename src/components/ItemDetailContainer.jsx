import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import Loading from "./Loading"
import { getProduct } from "../data/data.js"
import { CartContext } from "../context/CartContext"
import ItemDetail from "./ItemDetail"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState ({})
    const [loading, setLoading] = useState(true)
    const [ hideItemCount, setHideItemCount ] = useState(false)
    const { addProductInCart } = useContext(CartContext)
    const { idProduct } = useParams()
    

    const addProduct = (count)=> {
      const productCart = {...product, quantity : count}
      
      addProductInCart(productCart , count)
      setHideItemCount(true)
      
    }
    const removeButtonFinishBuy = ()=>{
      setHideItemCount(false)
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
        
        <ItemDetail product={product} addProduct={addProduct} hideItemCount={hideItemCount} removeButtonFinishBuy={removeButtonFinishBuy}/>
      }
    </>
    
  )
}

export default ItemDetailContainer