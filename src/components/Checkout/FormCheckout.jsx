import { Link } from "react-router-dom"

const FormCheckout = ({ dataForm, handleChangeInput, handleSubmitForm  }) => {
    return (
        <div className="min-w-82 bg-white rounded-lg shadow-md p-8 m-2 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 underline">Checkout</h2>
        <form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 flex-wrap dark:bg-gray-800 dark:border-gray-700" >
                <div className="flex flex-wrap dark:bg-gray-800 dark:border-gray-700">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Nombre/s: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="name" value={dataForm.name} onChange={handleChangeInput} placeholder='Nombre/s' required/>
                </div>
                <div className="flex flex-wrap"> 
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Apellido: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="surname" value={dataForm.surname} onChange={handleChangeInput} placeholder='Apellido/s' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Código de Área: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="number" name="areacode" value={dataForm.areacode} onChange={handleChangeInput} placeholder='sin 0' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Teléfono: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="number" name="phone" value={dataForm.phone} onChange={handleChangeInput} placeholder='sin 15' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Dirección: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="address" value={dataForm.address} onChange={handleChangeInput} placeholder='Calle,avenida,ruta...' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Número: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="number" value={dataForm.number} onChange={handleChangeInput} placeholder='Altura ó km' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >Piso: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="floor" value={dataForm.floor} onChange={handleChangeInput} placeholder='Piso'/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >Departamento: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="department" value={dataForm.departament} onChange={handleChangeInput} placeholder='Departamento ó Casa'/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Provincia: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="province" value={dataForm.province} onChange={handleChangeInput} placeholder='Provincia' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Localidad: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="locality" value={dataForm.locality} onChange={handleChangeInput} placeholder='Localidad, Ciudad, Pueblo...' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Código Postal: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="text" name="zipcode" value={dataForm.zipcode} onChange={handleChangeInput} placeholder='X5011FEM ó 5011' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Email: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="email" name="email" value={dataForm.email} onChange={handleChangeInput} placeholder='miemail@ejemplo.com' required/>
                </div>
                <div className="flex flex-wrap">
                    <label className="text-xl font-bold text-gray-900 mb-4 content-center dark:text-white" >*Repetir Email: </label>
                    <input className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-green-500 transition ease-in-out duration-150 mx-1" type="email" name="repeatemail" value={dataForm.repeatemail} onChange={handleChangeInput} placeholder='miemail@ejemplo.com' required/>
                </div>
            </div>
            <div className="flex justify-evenly dark:bg-gray-800 dark:border-gray-700">
                    <Link className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out" to="/cart">Volver al Carrito</Link>
                    <button className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out" type="submit">Finalizar Compra</button>
                </div>
        </form>
    </div>

    )
}

export default FormCheckout