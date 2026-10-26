import { useState } from "react"

const formatMoney = (value) =>
    Number(value || 0).toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS"
    })

const PurchaseSummary = ({
    order,
    paymentEnabled,
    isPaying,
    paymentError,
    onPay
}) => {
    const [showDetails, setShowDetails] = useState(false)
    const { buyer, products = [], total, id } = order

    return (
        <section className="w-full max-w-3xl rounded-lg border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
                Resumen de tu compra
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
                Revisá los datos antes de continuar al checkout seguro de Mercado Pago.
            </p>

            <div className="mb-6 rounded-md bg-gray-50 p-4 dark:bg-gray-700">
                <h3 className="mb-3 font-semibold text-gray-800 dark:text-white">Datos de entrega</h3>
                <dl className="grid grid-cols-1 gap-2 text-sm text-gray-700 dark:text-gray-200 sm:grid-cols-2">
                    <div><dt className="font-semibold">Nombre</dt><dd>{buyer.name} {buyer.surname}</dd></div>
                    <div><dt className="font-semibold">Email</dt><dd className="break-all">{buyer.email}</dd></div>
                    <div><dt className="font-semibold">Teléfono</dt><dd>{buyer.areacode} {buyer.phone}</dd></div>
                    <div><dt className="font-semibold">Código postal</dt><dd>{buyer.zipcode}</dd></div>
                    <div className="sm:col-span-2"><dt className="font-semibold">Dirección</dt><dd>{buyer.address} {buyer.number}{buyer.floor ? `, piso ${buyer.floor}` : ""}{buyer.department ? `, ${buyer.department}` : ""}, {buyer.locality}, {buyer.province}</dd></div>
                </dl>
            </div>

            <div className="mb-6">
                <h3 className="mb-3 font-semibold text-gray-800 dark:text-white">Productos</h3>
                <div className="divide-y rounded-md border dark:divide-gray-600 dark:border-gray-600">
                    {products.map((product) => (
                        <div className="flex items-center justify-between gap-4 p-3 text-sm" key={product.id}>
                            <span className="text-gray-700 dark:text-gray-200">{product.nombre} x {product.quantity}</span>
                            <span className="font-semibold text-gray-800 dark:text-white">{formatMoney(product.precio * product.quantity)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between bg-gray-50 p-3 font-bold dark:bg-gray-700 dark:text-white">
                        <span>Total</span>
                        <span>{formatMoney(total)}</span>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className="mb-4 text-sm font-semibold text-green-700 underline dark:text-green-300"
                onClick={() => setShowDetails((current) => !current)}
            >
                {showDetails ? "Ocultar" : "Mostrar"} datos técnicos de la orden
            </button>

            {showDetails && (
                <p className="mb-4 break-all rounded-md bg-gray-100 p-3 text-xs text-gray-600 dark:bg-gray-900 dark:text-gray-300">
                    Número de orden: {id}<br />
                    Estado: {order.status}<br />
                    Preferencia de pago: {order.paymentPreferenceId || "Pendiente de generar"}<br />
                    ID de pago: {order.paymentId || "Pendiente de pago"}
                </p>
            )}

            {paymentError && (
                <p className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-200" role="alert">
                    {paymentError}
                </p>
            )}

            {paymentEnabled ? (
                <button
                    type="button"
                    disabled={isPaying}
                    onClick={onPay}
                    className="w-full rounded-lg bg-[#009ee3] px-5 py-3 font-bold text-white transition hover:bg-[#007eb5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isPaying ? "Preparando pago..." : "Pagar con Mercado Pago"}
                </button>
            ) : (
                <p className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    El pago online no está configurado. Tu orden fue guardada correctamente.
                </p>
            )}
        </section>
    )
}

export default PurchaseSummary
