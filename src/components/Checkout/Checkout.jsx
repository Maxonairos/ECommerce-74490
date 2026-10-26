import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import FormCheckout from "./FormCheckout.jsx"
import { CartContext } from "../../context/CartContext.jsx"
import { Timestamp, collection, doc, runTransaction } from "firebase/firestore"
import db from "../../db/db.js"
import BuySuccess from "./BuySuccess.jsx"
import Swal from "sweetalert2"
import Loading from "../Loading.jsx"
import useProvinces from "../../hooks/useProvinces.js"
import {
    createPaymentPreference,
    isMercadoPagoEnabled
} from "../../api/mercadopago.js"
import {
    checkoutFields,
    normalizeCheckoutForm,
    validateCheckoutField,
    validateCheckoutForm
} from "../../utils/validateCheckout.js"

const sanitizeInputValue = (fieldName, value) => {
    if (fieldName === "areacode" || fieldName === "phone") {
        return value.replace(/\D/g, "")
    }

    if (fieldName === "zipcode") {
        return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
    }

    if (fieldName === "floor" || fieldName === "department") {
        return value.toUpperCase()
    }

    return value
}

const Checkout = () => {
    const [dataForm, setDataForm] = useState({
        name: "",
        surname: "",
        email: "",
        address: "",
        number: "",
        floor: "",
        department: "",
        province: "",
        locality: "",
        zipcode: "",
        areacode: "",
        phone: "",
        repeatemail: ""
    })

    const [errors, setErrors] = useState({})
    const [orderId, setOrderId] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const isRedirectingRef = useRef(false)
    const { cart, totalPriceCart, deleteCart } = useContext(CartContext)
    const {
        provinces,
        loading: provincesLoading,
        error: provincesError,
        reload: reloadProvinces
    } = useProvinces()
    const navigate = useNavigate()

    useEffect(() => {
        if (!orderId && !isRedirectingRef.current && cart.length === 0) {
            navigate("/cart", { replace: true })
        }
    }, [cart.length, orderId, navigate])

    const handleChangeInput = (event) => {
        const { name, value } = event.target
        const sanitizedValue = sanitizeInputValue(name, value)

        setDataForm((currentForm) => {
            const nextForm = { ...currentForm, [name]: sanitizedValue }

            if (name === "province") {
                nextForm.locality = ""
            }

            return nextForm
        })

        setErrors((currentErrors) => {
            const shouldClearLocality = name === "province" && currentErrors.locality
            const shouldClearRepeatedEmail = name === "email" && currentErrors.repeatemail

            if (!currentErrors[name] && !shouldClearLocality && !shouldClearRepeatedEmail) {
                return currentErrors
            }

            const nextErrors = { ...currentErrors }
            delete nextErrors[name]

            if (name === "province") delete nextErrors.locality
            if (name === "email") delete nextErrors.repeatemail

            return nextErrors
        })
    }

    const handleBlurField = (event) => {
        const { name, value } = event.target
        const fieldError = validateCheckoutField(name, value, dataForm, provinces)

        setErrors((currentErrors) => {
            const nextErrors = { ...currentErrors }

            if (fieldError) {
                nextErrors[name] = fieldError
            } else {
                delete nextErrors[name]
            }

            return nextErrors
        })
    }

    const handleSubmitForm = async (event) => {
        event.preventDefault()

        if (isSubmitting) return

        if (cart.length === 0) {
            Swal.fire({
                icon: "warning",
                title: "Carrito vacío",
                text: "Agregá productos antes de finalizar la compra.",
                confirmButtonColor: "#00916E"
            })
            return
        }

        if (provincesLoading || provincesError) {
            Swal.fire({
                icon: "warning",
                title: "Ubicaciones no disponibles",
                text: provincesError || "Esperá a que terminen de cargar las provincias y localidades.",
                confirmButtonColor: "#00916E"
            })
            return
        }

        const normalizedForm = normalizeCheckoutForm(dataForm)
        const validationErrors = validateCheckoutForm(normalizedForm, provinces)
        setErrors(validationErrors)

        if (Object.keys(validationErrors).length > 0) {
            const firstInvalidField = checkoutFields.find((fieldName) => validationErrors[fieldName])

            requestAnimationFrame(() => {
                document.getElementById(firstInvalidField)?.focus()
            })
            return
        }

        setIsSubmitting(true)

        const { repeatemail, ...buyer } = normalizedForm

        try {
            const orderRef = doc(collection(db, "orders"))
            let preference = null

            // La preferencia se crea antes de guardar la orden para poder
            // incluir el ID del link de pago en el mismo documento. Si falla,
            // la orden no se crea y el carrito queda intacto para reintentar.
            if (isMercadoPagoEnabled) {
                preference = await createPaymentPreference({
                    items: cart,
                    orderId: orderRef.id,
                    payer: {
                        name: buyer.name,
                        surname: buyer.surname,
                        email: buyer.email
                    }
                })

                if (!preference?.preferenceId) {
                    throw new Error("Mercado Pago no devolvió el ID del link de pago.")
                }
            }

            const order = {
                buyer,
                products: cart.map((productCart) => ({
                    id: productCart.id,
                    nombre: productCart.nombre,
                    precio: Number(productCart.precio) || 0,
                    quantity: Number(productCart.quantity) || 0
                })),
                date: Timestamp.fromDate(new Date()),
                total: totalPriceCart(),
                status: "pending",
                paymentPreferenceId: preference?.preferenceId ?? null,
                paymentInitPoint:
                    preference?.checkoutUrl ?? preference?.initPoint ?? null,
                paymentId: null
            }

            await runTransaction(db, async (transaction) => {
                const productsToUpdate = []

                // Firestore requires every read to happen before any write.
                for (const productCart of cart) {
                    const productRef = doc(db, "productos", productCart.id)
                    const productSnapshot = await transaction.get(productRef)

                    if (!productSnapshot.exists()) {
                        throw new Error(`El producto "${productCart.nombre}" ya no está disponible.`)
                    }

                    const availableStock = Number(productSnapshot.data().cantidad) || 0
                    const requestedQuantity = Number(productCart.quantity) || 0

                    if (availableStock < requestedQuantity) {
                        throw new Error(
                            `No hay stock suficiente de "${productCart.nombre}". Disponible: ${availableStock}.`
                        )
                    }

                    productsToUpdate.push({
                        ref: productRef,
                        availableStock,
                        requestedQuantity
                    })
                }

                transaction.set(orderRef, order)
                productsToUpdate.forEach(({ ref, availableStock, requestedQuantity }) => {
                    transaction.update(ref, {
                        cantidad: availableStock - requestedQuantity
                    })
                })
            })

            const checkoutUrl =
                preference?.checkoutUrl ?? preference?.initPoint ?? null

            if (checkoutUrl) {
                isRedirectingRef.current = true
                deleteCart()
                window.location.assign(checkoutUrl)
                return
            }

            setOrderId(orderRef.id)
            deleteCart()
        } catch (error) {
            console.error("No se pudo finalizar la compra:", error)
            Swal.fire({
                icon: "error",
                title: error.isPaymentApiError
                    ? "No se pudo iniciar el pago"
                    : "No se pudo completar la compra",
                text: error.message || "Ocurrió un error inesperado. Intentá nuevamente.",
                confirmButtonColor: "#00916E"
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    if (orderId) {
        return (
            <div className="flex flex-wrap justify-center min-h-screen">
                <div className="flex content-center">
                    <BuySuccess orderId={orderId} />
                </div>
            </div>
        )
    }

    if (cart.length === 0) return null

    return (
        <div className="flex flex-wrap justify-center min-h-screen">
            <div className="flex content-center">
                {isSubmitting ? (
                    <Loading />
                ) : (
                    <FormCheckout
                        dataForm={dataForm}
                        errors={errors}
                        provinces={provinces}
                        provincesLoading={provincesLoading}
                        provincesError={provincesError}
                        reloadProvinces={reloadProvinces}
                        handleSubmitForm={handleSubmitForm}
                        handleChangeInput={handleChangeInput}
                        handleBlurField={handleBlurField}
                    />
                )}
            </div>
        </div>
    )
}

export default Checkout
