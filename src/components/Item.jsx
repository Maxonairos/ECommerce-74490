import { Link } from "react-router-dom"
const Item = ({product}) => {
  return (
    <div >
              <p>Nombre: {product.nombre}</p>
              <p>Precio: {product.precio}$ ARS</p>
              <p>Categoria: {product.categoria}</p>
              <img src={product.img} width={500} alt="imagen del producto" />
              <Link to={`/detalle/${product.id}`}>Ver Detalles</Link>
    </div>
  )
}

export default Item


