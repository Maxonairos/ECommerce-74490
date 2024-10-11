import logo from "../../assets/logo.png"
import CartWidget from "./CartWidget"
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="bg-success-subtle">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-evenly sm:items-stretch sm:justify-center">
            <NavLink to="/" className="flex flex-shrink-0 items-center">
                <img className="h-8 w-auto" src={logo} lt="GamerStore Logo"/>
            </NavLink>
            <div className="hidden sm:ml-6 sm:block">
              <ul className="flex space-x-4 ">
                <li className="flex">
                  <NavLink className={({isActive})=>(isActive ? "bg-gray-900 font-medium text-white": "") +" rounded-md px-3 py-2 text-sm font-bold text-gray-500 hover:bg-gray-700 hover:text-white"} to="/" >Home</NavLink>
                </li>
                <li className="flex">
                  <NavLink className={({isActive})=>(isActive ? "bg-gray-900 font-medium text-white": "") +" rounded-md px-3 py-2 text-sm font-bold text-gray-500 hover:bg-gray-700 hover:text-white"} to="/categoria/monitores">Monitores</NavLink>
                </li>
                <li className="flex">
                <NavLink className={({isActive})=>(isActive ? "bg-gray-900 font-medium text-white": "") +" rounded-md px-3 py-2 text-sm font-bold text-gray-500 hover:bg-gray-700 hover:text-white"} to="/categoria/perifericos">Periféricos</NavLink>
                </li>
                <li className="flex">
                <NavLink className={({isActive})=>(isActive ? "bg-gray-900 font-medium text-white": "") +" rounded-md px-3 py-2 text-sm font-bold text-gray-500 hover:bg-gray-700 hover:text-white"} to="/categoria/escritorio">PC´s de Escritorio</NavLink>
                </li>
                <CartWidget/> 1
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a href="#" className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Home</a>
          <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white">Productos</a>
          <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-700 hover:text-white">Carrito</a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar