import Item from "./Item"

const ItemList = ({products}) => {
  return (
    <div className="flex flex-wrap items-center justify-evenly sm:items-stretch sm:justify-center">
        {
          products.map((product)=>(
            <Item product={product} key={product.id}/>
          ))
        }
    </div>
  )
}

export default ItemList