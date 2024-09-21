import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import './App.css'

function App() {
  
  return (
    <div className='bg-gray-100 min-w-0 min-w-full min-h-screen'>
      <NavBar/>
      <ItemListContainer saludo={"¡Bienvenidos a GamerStore! Estamos emocionados de tenerte aquí en tu nuevo destino para todo lo relacionado con el mundo de los videojuegos y la tecnología. En GamerStore, encontrarás una amplia gama de componentes de PC, periféricos y todo lo necesario para llevar tu experiencia gamer al siguiente nivel. Ya sea que busques mejorar tu configuración actual o equiparte desde cero, estamos aquí para ofrecerte los mejores productos y asesoramiento. ¡Explora nuestra tienda y prepárate para jugar en grande!"} />
    </div>
  )
}

export default App
