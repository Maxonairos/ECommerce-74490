import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    where
} from "firebase/firestore"
import db from "../db/db.js"
import { getPayment, isMercadoPagoEnabled } from "./mercadopago.js"

const serializeOrder = (snapshot) => ({ id: snapshot.id, ...snapshot.data() })

export const findOrdersByDni = async (dni) => {
    const ordersQuery = query(
        collection(db, "orders"),
        where("buyer.dni", "==", dni),
        limit(20)
    )
    const result = await getDocs(ordersQuery)
    return result.docs
        .map(serializeOrder)
        .sort((first, second) => {
            const firstDate = first.date?.toMillis?.() || 0
            const secondDate = second.date?.toMillis?.() || 0
            return secondDate - firstDate
        })
}

export const findOrderById = async (orderId) => {
    const result = await getDoc(doc(db, "orders", orderId))
    return result.exists() ? serializeOrder(result) : null
}

export const findOrderByPaymentId = async (paymentId) => {
    if (!isMercadoPagoEnabled) {
        throw new Error("La consulta por número de operación requiere Mercado Pago configurado.")
    }

    const paymentResult = await getPayment(paymentId)
    const payment = paymentResult.payment
    const orderId = payment?.external_reference

    if (!orderId) return { order: null, payment }

    return {
        order: await findOrderById(orderId),
        payment
    }
}
