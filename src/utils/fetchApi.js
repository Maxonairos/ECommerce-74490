const url = 'https://45680e03-f2d0-46b4-91bf-4bc5e2f30fcb.mock.pstmn.io/api/datos'

const requestProducts = async () => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Error al obtener los productos (${response.status})`)
    }

    return response.json()
}

const getProductsApi = async () => {
    try {
        return await requestProducts()
    } catch (error) {
        console.error("getProductsApi:", error)
        return []
    }
}

const getProductApi = async (idProduct) => {
    try {
        const products = await requestProducts()
        return products.find((product) => String(product.id) === String(idProduct)) ?? null
    } catch (error) {
        console.error("getProductApi:", error)
        return null
    }
}

export { getProductApi, getProductsApi }
