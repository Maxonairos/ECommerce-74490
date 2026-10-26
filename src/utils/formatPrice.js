const formatPrice = (value) => {
    const price = Number(value)

    if (!Number.isFinite(price)) return "$ 0"

    return `$ ${price.toLocaleString("es-AR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })}`
}

export default formatPrice
