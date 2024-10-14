

const url = 'https://45680e03-f2d0-46b4-91bf-4bc5e2f30fcb.mock.pstmn.io/api/datos'


const getProductsApi = ()=>{
    return fetch(url)
    .then((response)=> response.json())
    .catch((error)=> console.error(error))
}

const getProductApi = (idProduct) => {
    return fetch(url)
    .then((response)=> response.json())
    .then((data)=> data.find((product)=> product.id === parseInt(idProduct))
    ) 
    .catch((error)=> console.error(error));
}



export { getProductApi , getProductsApi }