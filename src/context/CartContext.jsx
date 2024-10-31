import { createContext, useState } from "react"
import Swal from "sweetalert2"

const CartContext = createContext()

const CartProvider = ({children})=>{


    let mensajeToast = ""
    let mensaje1 = "Producto Agregado al Carrito"
    let mensaje2 = "Productos Agregados al Carrito"

    const setMessageToast = (count)=>{
        if (count > 1){
            mensajeToast = `${count} ${mensaje2}`
        } else {
            mensajeToast = `${count} ${mensaje1}`
        }

    }

    let addProductToast =()=>{
        Swal.fire({
            icon: "success",
            title: `${mensajeToast}`,
            showConfirmButton: false,
            confirmButtonColor: "#00916E",
            timer: 1500,
            timerProgressBar: true
        })
    }

    let stockLimitToast = ()=>{
        Swal.fire({
            icon: "warning",
            title: "Superaste el límite de Stock por este producto",
            text: "Verificá si ya tienes productos en el carrito o si estas intentando agregar mas de lo tenemos en este momento 😀",
            confirmButtonColor: "#00916E"
        })
    }

    const [ cart, setCart ] = useState([])

    const addProductInCart = (newProduct, count) => {
        setMessageToast(count)
        if (isInCart(newProduct.id)) {
                const checkCart = cart.map(cartProduct => {
                    if (cartProduct.id == newProduct.id) {
                        const nuevaCantidad = cartProduct.quantity + count
                        
                        if (nuevaCantidad > newProduct.cantidad){
                            stockLimitToast()
                            return cartProduct
                            }
                            addProductToast()
                        return {...cartProduct, quantity: nuevaCantidad }
                        }  
                return cartProduct
                })
                setCart(checkCart)
                                
            } else {
                setCart([...cart, newProduct]);
                addProductToast()
                
        }
        
        
    }
    
    const deleteProductInCart = (idProduct) => {
        const productsFilter = cart.filter((productCart)=> productCart.id !== idProduct )
        setCart(productsFilter)
    }

    const totalQuantity = ()=>{
    const quantity = cart.reduce( (total, productCart)=> total + productCart.quantity, 0 )
        return quantity
    }
    
    const totalPriceCart = ()=>{
        const price = cart.reduce((total, productCart) => total + (productCart.precio * productCart.quantity), 0)
            return price
        }
    
    const deleteCart = ()=>{
        setCart([])
    }
    const isInCart = (idProduct)=>{
        const checkCart = cart.some(CartProduct => CartProduct.id === idProduct)
        return checkCart
        
    }


    return(
        <CartContext.Provider value={ { cart, addProductInCart, totalQuantity, totalPriceCart, deleteProductInCart, deleteCart, setMessageToast, isInCart } }>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }