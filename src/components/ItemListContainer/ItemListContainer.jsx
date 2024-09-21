import './itemlistcontainer.css'

const ItemListContainer = ({ saludo }) => {
  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 p-10'>
        <h2>{saludo}</h2>
    </div>
  )
}

export default ItemListContainer