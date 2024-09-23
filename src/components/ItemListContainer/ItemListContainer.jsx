import './itemlistcontainer.css'

const ItemListContainer = ({ greeting }) => {
  return (
    <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 p-10'>
        <h2>{greeting}</h2>
    </div>
  )
}

export default ItemListContainer