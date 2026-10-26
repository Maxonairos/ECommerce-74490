const MP_API_URL = (import.meta.env.VITE_MP_API_URL || "").replace(/\/+$/, "")

export const isMercadoPagoEnabled = Boolean(MP_API_URL)

const request = async (path, options = {}) => {
    if (!MP_API_URL) {
        throw new Error("Falta configurar VITE_MP_API_URL para iniciar el pago.")
    }

    let response

    try {
        response = await fetch(`${MP_API_URL}${path}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        })
    } catch {
        const error = new Error("No se pudo conectar con el servicio de pagos. Revisá tu conexión e intentá nuevamente.")
        error.isPaymentApiError = true
        throw error
    }

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        const error = new Error(data.error || `Error HTTP ${response.status} al contactar Mercado Pago.`)
        error.status = response.status
        error.code = data.code
        error.isPaymentApiError = true
        throw error
    }

    return data
}

export const createPaymentPreference = ({ items, orderId, payer }) =>
    request("/api/create-preference", {
        method: "POST",
        body: JSON.stringify({
            items: items.map((product) => ({
                id: product.id,
                title: product.nombre,
                quantity: Number(product.quantity),
                unit_price: Number(product.precio),
                currency_id: "ARS"
            })),
            external_reference: orderId,
            payer: payer
                ? {
                    name: payer.name,
                    surname: payer.surname,
                    email: payer.email
                }
                : undefined,
            metadata: {
                orderId,
                source: "gamerstore"
            },
            back_urls: {
                success: `${window.location.origin}/checkout/resultado`,
                pending: `${window.location.origin}/checkout/resultado`,
                failure: `${window.location.origin}/checkout/resultado`
            }
        })
    })

export const getPayment = (paymentId) =>
    request(`/api/payments/${encodeURIComponent(paymentId)}`)

export const lookupPayments = ({ paymentId, preferenceId, externalReference }) => {
    const params = new URLSearchParams()

    if (paymentId) params.set("payment_id", paymentId)
    if (preferenceId) params.set("preference_id", preferenceId)
    if (externalReference) params.set("external_reference", externalReference)

    return request(`/api/payments/lookup?${params.toString()}`)
}
