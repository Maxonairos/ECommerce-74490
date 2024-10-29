import React from 'react'

const FormCheckout = ({ dataForm, handleChangeInput, handleSubmitForm  }) => {
    return (
    
        <div>
        <form onSubmit={handleSubmitForm}>
            <label >Nombre Completo: </label>
            <input type="text" name="fullname" value={dataForm.fullname} onChange={handleChangeInput}/>

            <label >Teléfono: </label>
            <input type="number" name="phone" value={dataForm.phone} onChange={handleChangeInput}/>

            <label >Email: </label>
            <input type="email" name="email" value={dataForm.email} onChange={handleChangeInput}/>

            <button className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">Finalizar Compra</button>

        </form>
    </div>

    )
}

export default FormCheckout