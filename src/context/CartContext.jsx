import { createContext, useEffect, useMemo, useRef, useState } from "react"
import Swal from "sweetalert2"

const CartContext = createContext()

const STORAGE_KEY = "gamerstore-cart"

const isValidCartProduct = (product) =>
    product &&
    product.id !== undefined &&
    product.id !== null &&
    Number(product.quantity) > 0 &&
    Number.isFinite(Number(product.precio))

const readStoredCart = () => {
    if (typeof window === "undefined") return []

    try {
        const storedCart = window.localStorage.getItem(STORAGE_KEY)
        if (!storedCart) return []

        const parsedCart = JSON.parse(storedCart)
        return Array.isArray(parsedCart) ? parsedCart.filter(isValidCartProduct) : []
    } catch (error) {
        console.error("No se pudo leer el carrito guardado:", error)
        return []
    }
}

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(readStoredCart)
    const cartRef = useRef(cart)

    const commitCart = (nextCart) => {
        cartRef.current = nextCart
        setCart(nextCart)
    }

    useEffect(() => {
        if (typeof window === "undefined") return

        try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
        } catch (error) {
            console.error("No se pudo guardar el carrito:", error)
        }
    }, [cart])

    const addProductToast = (count, totalInCart) => {
        const addedMessage = count === 1
            ? "1 producto agregado al carrito"
            : `${count} productos agregados al carrito`

        Swal.fire({
            icon: "success",
            title: addedMessage,
            text: `Tenés ${totalInCart} ${totalInCart === 1 ? "unidad" : "unidades"} de este producto en el carrito`,
            showConfirmButton: false,
            timer: 1700,
            timerProgressBar: true
        })
    }

    const stockLimitToast = (availableStock) => {
        if (!availableStock) {
            Swal.fire({
                icon: "warning",
                title: "Sin stock",
                text: "Este producto no tiene stock disponible en este momento.",
                confirmButtonColor: "#00916E"
            })
            return
        }

        Swal.fire({
            icon: "warning",
            title: "Superaste el límite de stock",
            text: `Podés agregar hasta ${availableStock} ${availableStock === 1 ? "unidad" : "unidades"} de este producto. Revisá las unidades que ya tenés en el carrito.`,
            confirmButtonColor: "#00916E"
        })
    }

    const isInCart = (idProduct) =>
        cartRef.current.some(
            (cartProduct) => String(cartProduct.id) === String(idProduct)
        )

    const addProductInCart = (newProduct, count) => {
        const quantityToAdd = Number(count)
        const availableStock = Number(newProduct?.cantidad)

        if (!newProduct?.id || !Number.isInteger(quantityToAdd) || quantityToAdd <= 0) {
            return false
        }

        if (!Number.isFinite(availableStock) || availableStock <= 0) {
            stockLimitToast(0)
            return false
        }

        const currentCart = cartRef.current
        const productInCart = currentCart.find(
            (cartProduct) => String(cartProduct.id) === String(newProduct.id)
        )
        const quantityInCart = productInCart ? Number(productInCart.quantity) : 0
        const newQuantity = quantityInCart + quantityToAdd

        if (newQuantity > availableStock) {
            stockLimitToast(availableStock)
            return false
        }

        const nextCart = productInCart
            ? currentCart.map((cartProduct) =>
                String(cartProduct.id) === String(newProduct.id)
                    ? { ...cartProduct, quantity: newQuantity }
                    : cartProduct
            )
            : [...currentCart, { ...newProduct, quantity: quantityToAdd }]

        commitCart(nextCart)
        addProductToast(quantityToAdd, newQuantity)
        return true
    }

    const deleteProductInCart = (idProduct) => {
        commitCart(
            cartRef.current.filter(
                (cartProduct) => String(cartProduct.id) !== String(idProduct)
            )
        )
    }

    const deleteCart = () => {
        commitCart([])
    }

    const totalQuantity = () =>
        cart.reduce((total, cartProduct) => total + Number(cartProduct.quantity || 0), 0)

    const totalPriceCart = () =>
        cart.reduce(
            (total, cartProduct) =>
                total + Number(cartProduct.precio || 0) * Number(cartProduct.quantity || 0),
            0
        )

    const contextValue = useMemo(
        () => ({
            cart,
            addProductInCart,
            totalQuantity,
            totalPriceCart,
            deleteProductInCart,
            deleteCart,
            isInCart
        }),
        // The context value must change whenever the cart changes so consumers
        // re-render. The handlers themselves always read the latest cart from
        // cartRef, which also protects against very fast consecutive updates.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cart]
    )

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
