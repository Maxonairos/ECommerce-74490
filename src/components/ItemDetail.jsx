import React from 'react'

const ItemDetail = ( {product} ) => {
  return (
    <div className="itemDetailContainer">
        <h2>{product.nombre}</h2>
        <img src={product.img} width={500} alt="Imagen de producto" />
        <p>Precio: {product.precio}$ ARS</p>
        <p>Descripción: {product.descripcion}</p>

    </div>
  )
}

export default ItemDetail