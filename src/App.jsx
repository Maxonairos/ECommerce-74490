import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer'
import NotFound from './components/NotFound'
import { CartProvider } from './context/CartContext'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer'
import Checkout from './components/Checkout/Checkout'

function App() {
  
  return (
    <div className='container justify-center bg-gray-100 min-w-0 min-w-full min-h-screen max-h-4/5 dark:bg-gray-800 dark:border-gray-700'>
      <BrowserRouter>
      <CartProvider>
        <NavBar/>   
        <Routes>
          <Route path= "/" element={<ItemListContainer greeting="¡Bienvenidos a GamerStore! Estamos emocionados de tenerte aquí en tu nuevo destino para todo lo relacionado con el mundo de los videojuegos y la tecnología. En GamerStore, encontrarás una amplia gama de componentes de PC, periféricos y todo lo necesario para llevar tu experiencia gamer al siguiente nivel. Ya sea que busques mejorar tu configuración actual o equiparte desde cero, estamos aquí para ofrecerte los mejores productos y asesoramiento. ¡Explora nuestra tienda y prepárate para jugar en grande!"/>}/>  
          <Route path= "/categoria/:idCategory" element={<ItemListContainer/>}/>
          <Route path= "/detalle/:idProduct" element={<ItemDetailContainer/>}/>
          <Route path= "*" element={<NotFound/>}/>
          <Route path= "/cart" element={<Cart/>}/>
          <Route path= "/checkout" element={<Checkout/>}/>            
        </Routes>
        <Footer/>
        </CartProvider>  
      </BrowserRouter>  
    </div>
  )
}

export default App
