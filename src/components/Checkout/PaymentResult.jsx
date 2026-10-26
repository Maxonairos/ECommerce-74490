import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { doc, serverTimestamp, updateDoc } from "firebase/firestore"
import db from "../../db/db.js"
import {
    getPayment,
    isMercadoPagoEnabled,
    lookupPayments
} from "../../api/mercadopago.js"

const ORDER_STATUS_BY_PAYMENT_STATUS = {
    approved: "paid",
    pending: "pending",
    in_process: "pending",
    authorized: "pending",
    in_mediation: "pending",
    rejected: "rejected",
    cancelled: "cancelled",
    refunded: "refunded",
    charged_back: "charged_back"
}

const PENDING_PAYMENT_STATUSES = ["pending", "in_process", "authorized", "in_mediation"]

const savePaymentInOrder = async ({ orderId, payment, preferenceId }) => {
    const orderRef = doc(db, "orders", orderId)
    const payload = {
        paymentId: String(payment.id),
        paymentStatus: payment.status || null,
        paymentStatusDetail: payment.status_detail || null,
        paymentMethod: payment.payment_method_id || null,
        paymentType: payment.payment_type_id || null,
        paymentAmount: Number(payment.transaction_amount) || 0,
        paymentInstallments: Number(payment.installments) || null,
        paymentDateApproved: payment.date_approved || null,
        paymentUpdatedAt: serverTimestamp(),
        status: ORDER_STATUS_BY_PAYMENT_STATUS[payment.status] || "pending"
    }

    if (preferenceId) {
        payload.paymentPreferenceId = preferenceId
    }

    try {
        await updateDoc(orderRef, payload)
        return true
    } catch (error) {
        // La UI igual muestra el estado del pago; el error queda en consola
        // para revisar las reglas de Firestore si la orden no se actualiza.
        console.error("No se pudo guardar el pago en la orden:", error)
        return false
    }
}

const PaymentResult = () => {
    const [params] = useSearchParams()
    const [state, setState] = useState({ loading: true })

    const paymentId = params.get("payment_id") || params.get("collection_id")
    const preferenceId = params.get("preference_id")
    const externalReference = params.get("external_reference")
    const result = params.get("status") || params.get("collection_status")

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            if (!isMercadoPagoEnabled) {
                setState({
                    loading: false,
                    error: "La integración de pagos no está configurada (falta VITE_MP_API_URL)."
                })
                return
            }

            if (!paymentId && !preferenceId && !externalReference) {
                setState({ loading: false, result, externalReference: null, payment: null })
                return
            }

            try {
                let payment = null

                if (paymentId) {
                    const data = await getPayment(paymentId)
                    payment = data.payment || null
                } else {
                    // Si Mercado Pago no devuelve payment_id, buscamos por link
                    // de pago o por la orden. El backend degrada con un warning
                    // cuando la cuenta no permite leer preferencias.
                    const data = await lookupPayments({ preferenceId, externalReference })
                    payment = data.payment || data.payments?.[0] || null
                }

                const orderId = payment?.external_reference || externalReference || null
                let orderSaved = true

                if (payment && orderId) {
                    orderSaved = await savePaymentInOrder({ orderId, payment, preferenceId })
                }

                if (!cancelled) {
                    setState({
                        loading: false,
                        payment,
                        result,
                        externalReference: orderId,
                        orderSaved
                    })
                }
            } catch (error) {
                if (!cancelled) {
                    setState({
                        loading: false,
                        error: error.message,
                        result,
                        externalReference
                    })
                }
            }
        }

        load()

        return () => {
            cancelled = true
        }
    }, [paymentId, preferenceId, externalReference, result])

    if (state.loading) {
        return (
            <div className="flex flex-wrap justify-center min-h-screen">
                <div className="max-w-2xl bg-white rounded-lg shadow-md p-8 m-2 dark:bg-gray-800 dark:border-gray-700 border max-h-fit">
                    <p className="text-lg text-gray-800 dark:text-white">
                        Verificando el pago…
                    </p>
                </div>
            </div>
        )
    }

    const payment = state.payment
    const approved = payment?.status === "approved"
    const pending = PENDING_PAYMENT_STATUSES.includes(payment?.status)

    const title = approved
        ? "¡Pago aprobado! 😀"
        : pending
            ? "Pago pendiente"
            : payment
                ? "El pago no fue aprobado"
                : ["rejected", "cancelled", "refunded", "charged_back", "failure"].includes(state.result)
                    ? "El pago no fue aprobado"
                    : "Estado del pago no disponible"

    return (
        <div className="flex flex-wrap justify-center min-h-screen">
            <div className="max-w-2xl bg-white rounded-lg shadow-md p-8 m-2 dark:bg-gray-800 dark:border-gray-700 border max-h-fit">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">
                    {title}
                </h2>

                {state.error && (
                    <p className="mb-4 text-red-600 dark:text-red-400">
                        {state.error}
                    </p>
                )}

                {state.orderSaved === false && (
                    <p className="mb-4 rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        El pago se verificó, pero no se pudo actualizar la orden en Firestore.
                        Revisá los permisos de escritura de la colección <code>orders</code>.
                    </p>
                )}

                {payment && (
                    <dl className="mb-6 grid grid-cols-1 gap-2 text-gray-800 dark:text-gray-200 sm:grid-cols-2">
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Orden Nº</dt>
                            <dd className="break-all font-medium">{state.externalReference || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Pago Nº</dt>
                            <dd className="break-all font-medium">{payment.id || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Link de pago Nº</dt>
                            <dd className="break-all font-medium">{preferenceId || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado</dt>
                            <dd className="font-medium">{payment.status || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Detalle</dt>
                            <dd className="font-medium">{payment.status_detail || "—"}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Monto</dt>
                            <dd className="font-medium">
                                ${Number(payment.transaction_amount || 0).toLocaleString("es-AR")}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Método</dt>
                            <dd className="font-medium">{payment.payment_method_id || "—"}</dd>
                        </div>
                    </dl>
                )}

                {!payment && !state.error && (
                    <div className="mb-6 text-gray-700 dark:text-gray-300">
                        <p>
                            No encontramos un pago asociado a esta operación. Si ya pagaste, esperá unos minutos y revisá la orden en Firestore.
                        </p>
                        {state.externalReference && (
                            <p className="mt-2">
                                Orden Nº: <strong className="break-all">{state.externalReference}</strong>
                            </p>
                        )}
                        {preferenceId && (
                            <p className="mt-1">
                                Link de pago Nº: <strong className="break-all">{preferenceId}</strong>
                            </p>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap gap-3">
                    <Link
                        className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out"
                        to="/"
                    >
                        Volver al Inicio
                    </Link>
                    <Link
                        className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 no-underline hover:underline transition duration-300 ease-in-out"
                        to="/cart"
                    >
                        Volver al carrito
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PaymentResult
