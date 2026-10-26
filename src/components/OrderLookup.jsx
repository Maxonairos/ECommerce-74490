import { useState } from "react"
import { findOrderById, findOrderByPaymentId, findOrdersByDni } from "../api/orders.js"

const money = (value) => Number(value || 0).toLocaleString("es-AR", { style: "currency", currency: "ARS" })

const OrderCard = ({ order, payment }) => (
    <article className="rounded-lg border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-3 break-all text-lg font-bold text-gray-800 dark:text-white">Orden {order.id}</h3>
        <dl className="grid grid-cols-1 gap-2 text-sm text-gray-700 dark:text-gray-200 sm:grid-cols-2">
            <div><dt className="font-semibold">Fecha</dt><dd>{order.date?.toDate?.().toLocaleString("es-AR") || "-"}</dd></div>
            <div><dt className="font-semibold">Estado de la orden</dt><dd>{order.status || "pending"}</dd></div>
            <div><dt className="font-semibold">Estado del pago</dt><dd>{payment?.status || order.paymentStatus || "Sin iniciar"}</dd></div>
            <div><dt className="font-semibold">Detalle del pago</dt><dd>{payment?.status_detail || order.paymentStatusDetail || "-"}</dd></div>
            <div><dt className="font-semibold">Número de operación MP</dt><dd>{payment?.id || order.paymentId || "Pendiente"}</dd></div>
            <div><dt className="font-semibold">Preferencia MP</dt><dd className="break-all">{order.paymentPreferenceId || "Pendiente"}</dd></div>
            <div><dt className="font-semibold">Cliente</dt><dd>{order.buyer?.name} {order.buyer?.surname}</dd></div>
            <div><dt className="font-semibold">DNI</dt><dd>{order.buyer?.dni || "-"}</dd></div>
            <div className="sm:col-span-2"><dt className="font-semibold">Total</dt><dd className="text-lg font-bold">{money(order.total)}</dd></div>
        </dl>
        <div className="mt-4 border-t pt-3 dark:border-gray-700">
            <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">Productos</h4>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-200">
                {(order.products || []).map((product) => <li key={product.id}>{product.nombre} x {product.quantity} — {money(product.precio * product.quantity)}</li>)}
            </ul>
        </div>
    </article>
)

const OrderLookup = () => {
    const [type, setType] = useState("dni")
    const [value, setValue] = useState("")
    const [orders, setOrders] = useState([])
    const [payment, setPayment] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        const input = value.trim()
        if (!input) return setError("Ingresá un dato para buscar.")
        if (type === "dni" && !/^\d{7,8}$/.test(input)) return setError("El DNI debe tener entre 7 y 8 dígitos.")
        if (type === "payment" && !/^\d{1,20}$/.test(input)) return setError("El número de operación debe contener solo números.")

        setLoading(true)
        setError("")
        setOrders([])
        setPayment(null)
        try {
            if (type === "dni") {
                const result = await findOrdersByDni(input)
                if (result.length === 0) setError("No encontramos compras asociadas a ese DNI.")
                setOrders(result)
            } else if (type === "order") {
                const result = await findOrderById(input)
                if (!result) setError("No encontramos una orden con ese identificador.")
                else setOrders([result])
            } else {
                const result = await findOrderByPaymentId(input)
                if (!result.order) setError("Encontramos el pago, pero no la orden asociada.")
                else setOrders([result.order])
                setPayment(result.payment)
            }
        } catch (requestError) {
            setError(requestError.message || "No se pudo consultar la compra.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-5 px-4 py-8">
            <section className="rounded-lg border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Consultar compra</h1>
                <p className="mb-5 text-gray-600 dark:text-gray-300">Buscá tus datos por DNI, número de operación de Mercado Pago o número de orden.</p>
                <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[auto_1fr_auto]">
                    <select className="rounded-md bg-gray-100 p-3 text-gray-800 dark:bg-gray-700 dark:text-white" value={type} onChange={(event) => setType(event.target.value)}>
                        <option value="dni">DNI</option>
                        <option value="payment">Operación Mercado Pago</option>
                        <option value="order">ID de orden</option>
                    </select>
                    <input className="rounded-md bg-gray-100 p-3 text-gray-800 dark:bg-gray-700 dark:text-white" value={value} onChange={(event) => setValue(event.target.value)} placeholder={type === "dni" ? "30123456" : type === "payment" ? "Número de operación" : "ID de orden"} />
                    <button className="rounded-md bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60" disabled={loading}>{loading ? "Buscando..." : "Buscar"}</button>
                </form>
                {error && <p className="mt-4 rounded-md bg-red-50 p-3 text-red-700 dark:bg-red-950/40 dark:text-red-200" role="alert">{error}</p>}
            </section>
            {orders.map((order) => <OrderCard key={order.id} order={order} payment={payment} />)}
        </div>
    )
}

export default OrderLookup
