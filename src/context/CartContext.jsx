import { createContext, useState } from "react"
import Swal from "sweetalert2"

const CartContext = createContext()

const CartProvider = ({children})=>{

    let toast =()=>{
        Swal.fire({
            icon: "success",
            title: "Producto/s Agregado al Carrito",
            showConfirmButton: false,
            confirmButtonColor: "#00916E",
            timer: 1500
        })
    }

    const [ cart, setCart ] = useState([])

    const addProductInCart = (newProduct)=>{
    setCart([...cart, newProduct]),
    toast()
    }

    const deleteProductInCart = (idProduct) => {
        const productsFilter = cart.filter((productCart)=> productCart.id !== idProduct )
        setCart(productsFilter)
    }

    const totalQuantity = ()=>{
    const quantity = cart.reduce( (total, productCart)=> total + productCart.quantity, 0 )
        return quantity
    }

    //const isInCart = ()=>{
    //    const   some()
    //}

    const totalPrice = ()=>{
    const price = cart.reduce((total, productCart) => total + (productCart.precio * productCart.cantidad ), 0)
        return price
    }

    const deleteCart = ()=>{
        setCart([])
    }


    return(
        <CartContext.Provider value={ { cart, addProductInCart, totalQuantity, totalPrice, deleteProductInCart, deleteCart, toast } }>
            {children}
        </CartContext.Provider>
    )

}

export { CartContext, CartProvider }