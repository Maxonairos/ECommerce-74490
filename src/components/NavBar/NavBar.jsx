import { useState } from "react"
import { NavLink } from "react-router-dom"
import { FaBars, FaXmark } from "react-icons/fa6"
import logo from "../../assets/logo.png"
import CartWidget from "./CartWidget"
import CartWidgetMobile from "./CartWidgetMobile"

const categories = [
  { to: "/", label: "Home", end: true },
  { to: "/categoria/Monitores", label: "Monitores" },
  { to: "/categoria/Perifericos", label: "Periféricos" },
  { to: "/categoria/Gamer", label: "PCs Gamer" },
  { to: "/categoria/Notebooks", label: "Notebooks" }
]

const navLinkClasses = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-bold transition duration-200 ${
    isActive
      ? "bg-green-700 text-white"
      : "text-gray-600 hover:bg-gray-700 hover:text-white dark:text-gray-200"
  }`

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="bg-success-subtle dark:bg-gray-900 dark:border-b dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-between sm:justify-start">
            <NavLink to="/" className="flex flex-shrink-0 items-center" onClick={closeMenu}>
              <img className="h-8 w-auto" src={logo} alt="GamerStore Logo" />
            </NavLink>

            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:gap-1">
              {categories.map((category) => (
                <NavLink
                  key={category.to}
                  className={navLinkClasses}
                  to={category.to}
                  end={category.end}
                >
                  {category.label}
                </NavLink>
              ))}

              <NavLink
                className={({ isActive }) =>
                  `flex items-center rounded-md px-2 py-1 text-sm font-bold transition duration-200 ${
                    isActive
                      ? "bg-green-700 text-white"
                      : "text-gray-600 hover:bg-gray-700 hover:text-white dark:text-gray-200"
                  }`
                }
                to="/cart"
              >
                <CartWidget />
              </NavLink>
            </div>

            <div className="flex items-center gap-2 sm:hidden">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-1 rounded-md px-2 py-1 text-sm font-bold ${
                    isActive ? "bg-green-700 text-white" : "text-gray-700 dark:text-gray-200"
                  }`
                }
                to="/cart"
                onClick={closeMenu}
              >
                Carrito <CartWidgetMobile />
              </NavLink>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-gray-200"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              >
                {isMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${isMenuOpen ? "" : "hidden"}`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <ul>
            {categories.map((category) => (
              <li className="flex" key={category.to}>
                <NavLink
                  className={navLinkClasses}
                  to={category.to}
                  end={category.end}
                  onClick={closeMenu}
                >
                  {category.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
