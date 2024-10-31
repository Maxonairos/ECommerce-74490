import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center">
          <p className="text-base font-bold text-subtle-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Página no encontrada</h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">Disculpanos, pero no encontramos la página que estás buscando.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link className="rounded-md bg-success-subtle px-3.5 py-2.5 text-sm font-semibold text-grey-500 shadow-sm hover:hover:bg-gray-700 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700 " to="/">Volver al Inicio</Link>
          </div>
        </div>
      </div>
  )
}

export default NotFound