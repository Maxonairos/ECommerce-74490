import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import FormCheckout from "./FormCheckout.jsx"
import { CartContext } from "../../context/CartContext.jsx"
import { Timestamp, collection, doc, runTransaction, updateDoc } from "firebase/firestore"
import db from "../../db/db.js"
import PurchaseSummary from "./PurchaseSummary.jsx"
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
    const [order, setOrder] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isPaying, setIsPaying] = useState(false)
    const [paymentError, setPaymentError] = useState("")
    const { cart, totalPriceCart, deleteCart } = useContext(CartContext)
    const {
        provinces,
        loading: provincesLoading,
        error: provincesError,
        reload: reloadProvinces
    } = useProvinces()
    const navigate = useNavigate()

    useEffect(() => {
        if (!orderId && cart.length === 0) {
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
            const order = {
                id: orderRef.id,
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
                paymentPreferenceId: null,
                paymentInitPoint: null,
                paymentId: null,
                paymentStatus: null,
                paymentStatusDetail: null,
                paymentCreatedAt: null
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

            setOrderId(orderRef.id)
            setOrder(order)
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

    const handlePayment = async () => {
        if (!order || isPaying) return

        setIsPaying(true)
        setPaymentError("")

        try {
            const preference = await createPaymentPreference({
                items: order.products,
                orderId: order.id,
                payer: {
                    name: order.buyer.name,
                    surname: order.buyer.surname,
                    email: order.buyer.email
                }
            })

            const checkoutUrl = preference?.checkoutUrl ?? preference?.initPoint ?? null
            if (!preference?.preferenceId || !checkoutUrl) {
                throw new Error("Mercado Pago no devolvió una URL de checkout válida.")
            }

            const paymentData = {
                paymentPreferenceId: preference.preferenceId,
                paymentInitPoint: checkoutUrl,
                paymentSandbox: preference.sandbox === true,
                paymentStatus: "created",
                paymentStatusDetail: null,
                paymentCreatedAt: Timestamp.fromDate(new Date())
            }

            await updateDoc(doc(db, "orders", order.id), paymentData)
            setOrder((current) => ({ ...current, ...paymentData }))
            window.location.assign(checkoutUrl)
        } catch (error) {
            console.error("No se pudo iniciar el pago:", error)
            setPaymentError(error.message || "No se pudo iniciar el pago. Intentá nuevamente.")
        } finally {
            setIsPaying(false)
        }
    }

    if (orderId && order) {
        return (
            <div className="flex flex-wrap justify-center min-h-screen">
                <div className="flex content-center">
                    <PurchaseSummary
                        order={order}
                        paymentEnabled={isMercadoPagoEnabled}
                        isPaying={isPaying}
                        paymentError={paymentError}
                        onPay={handlePayment}
                    />
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
