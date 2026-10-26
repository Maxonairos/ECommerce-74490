import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Loading from './components/Loading'
import NotFound from './components/NotFound'
import { CartProvider } from './context/CartContext'
import Footer from './components/Footer'
import './App.css'

const ItemListContainer = lazy(() => import('./components/ItemListContainer/ItemListContainer'))
const ItemDetailContainer = lazy(() => import('./components/ItemDetailContainer'))
const Cart = lazy(() => import('./components/Cart/Cart'))
const Checkout = lazy(() => import('./components/Checkout/Checkout'))
const PaymentResult = lazy(() => import('./components/Checkout/PaymentResult'))

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const welcomeMessage = "¡Bienvenidos a GamerStore! Estamos emocionados de tenerte aquí en tu nuevo destino para todo lo relacionado con el mundo de los videojuegos y la tecnología. En GamerStore, encontrarás una amplia gama de componentes de PC, periféricos y todo lo necesario para llevar tu experiencia gamer al siguiente nivel. Ya sea que busques mejorar tu configuración actual o equiparte desde cero, estamos aquí para ofrecerte los mejores productos y asesoramiento. ¡Explora nuestra tienda y prepárate para jugar en grande!"

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-800">
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <NavBar />
          <main className="flex-1">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<ItemListContainer greeting={welcomeMessage} />} />
                <Route path="/categoria/:idCategory" element={<ItemListContainer />} />
                <Route path="/detalle/:idProduct" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/resultado" element={<PaymentResult />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
