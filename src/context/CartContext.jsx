import { createContext, useState } from "react"
import Swal from "sweetalert2"

const CartContext = createContext()

const CartProvider = ({children})=>{


    let mensajeToast = ""
    let mensaje1 = "Producto Agregado al Carrito"
    let mensaje2 = "Productos Agregados al Carrito"

    const setearMensaje = (count)=>{
        if (count > 1){
            mensajeToast = `${count} ${mensaje2}`
        } else {
            mensajeToast = `${count} ${mensaje1}`
        }

    }

    let toast =()=>{
        Swal.fire({
            icon: "success",
            title: `${mensajeToast}`,
            showConfirmButton: false,
            confirmButtonColor: "#00916E",
            timer: 2000,
            timerProgressBar: true
        })
    }

    const [ cart, setCart ] = useState([])

    const addProductInCart = (newProduct, count)=>{
    setCart([...cart, newProduct]),
    setearMensaje(count),
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

    
    const totalPriceCart = ()=>{
        const price = cart.reduce((total, productCart) => total + (productCart.precio * productCart.quantity), 0)
            return price
        }
    
    const deleteCart = ()=>{
        setCart([])
    }


    return(
        <CartContext.Provider value={ { cart, addProductInCart, totalQuantity, totalPriceCart, deleteProductInCart, deleteCart, toast } }>
            {children}
        </CartContext.Provider>
    )

}

export { CartContext, CartProvider }