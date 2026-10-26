import { Link } from "react-router-dom"

const fields = [
    {
        name: "name",
        label: "*Nombre/s",
        type: "text",
        placeholder: "Nombre/s",
        autoComplete: "given-name",
        required: true,
        maxLength: 50
    },
    {
        name: "surname",
        label: "*Apellido/s",
        type: "text",
        placeholder: "Apellido/s",
        autoComplete: "family-name",
        required: true,
        maxLength: 50
    },
    {
        name: "dni",
        label: "*DNI",
        type: "text",
        placeholder: "Sin puntos. Ej: 30123456",
        autoComplete: "off",
        required: true,
        maxLength: 8,
        inputMode: "numeric"
    },
    {
        name: "areacode",
        label: "*Código de área",
        type: "tel",
        placeholder: "Sin 0. Ej: 11",
        autoComplete: "tel-area-code",
        required: true,
        maxLength: 4,
        inputMode: "numeric"
    },
    {
        name: "phone",
        label: "*Teléfono",
        type: "tel",
        placeholder: "Sin 15. Ej: 41234567",
        autoComplete: "tel-local",
        required: true,
        maxLength: 8,
        inputMode: "numeric"
    },
    {
        name: "address",
        label: "*Dirección",
        type: "text",
        placeholder: "Calle, avenida, ruta...",
        autoComplete: "street-address",
        required: true,
        maxLength: 100
    },
    {
        name: "number",
        label: "*Número",
        type: "text",
        placeholder: "Altura o S/N",
        autoComplete: "address-line2",
        required: true,
        maxLength: 10
    },
    {
        name: "floor",
        label: "Piso",
        type: "text",
        placeholder: "Ej: 3, PB, 1°",
        autoComplete: "address-line3",
        required: false,
        maxLength: 3
    },
    {
        name: "department",
        label: "Departamento",
        type: "text",
        placeholder: "Departamento o casa",
        autoComplete: "address-line3",
        required: false,
        maxLength: 10
    },
    {
        name: "province",
        label: "*Provincia",
        type: "select",
        autoComplete: "address-level1",
        required: true
    },
    {
        name: "locality",
        label: "*Localidad",
        type: "select",
        autoComplete: "address-level2",
        required: true
    },
    {
        name: "zipcode",
        label: "*Código Postal",
        type: "text",
        placeholder: "X5011FEM o 5011",
        autoComplete: "postal-code",
        required: true,
        maxLength: 8
    },
    {
        name: "email",
        label: "*Email",
        type: "email",
        placeholder: "miemail@ejemplo.com",
        autoComplete: "email",
        required: true,
        maxLength: 254
    },
    {
        name: "repeatemail",
        label: "*Repetir Email",
        type: "email",
        placeholder: "miemail@ejemplo.com",
        autoComplete: "off",
        required: true,
        maxLength: 254
    }
]

const fieldClasses = (hasError) =>
    `w-full rounded-md border-0 p-2 mb-4 text-gray-800 transition duration-150 ease-in-out focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-60 ${
        hasError
            ? "bg-red-50 ring-2 ring-red-500 focus:ring-red-500 dark:bg-red-950/40 dark:text-white"
            : "bg-gray-100 text-gray-800 focus:bg-gray-200 focus:ring-green-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:bg-gray-600"
    }`

const FormCheckout = ({
    dataForm,
    errors,
    provinces,
    provincesLoading,
    provincesError,
    reloadProvinces,
    handleChangeInput,
    handleBlurField,
    handleSubmitForm
}) => {
    const selectedProvince = provinces.find((province) => province.nombre === dataForm.province)
    const localities = selectedProvince?.localidades || []
    const isLocationDisabled = provincesLoading || Boolean(provincesError)
    const submitDisabled = provincesLoading || Boolean(provincesError)

    return (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 m-2 border dark:bg-gray-800 dark:border-gray-700 max-h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 underline dark:text-white">
                Checkout
            </h2>

            {provincesLoading && (
                <p className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-gray-700 dark:text-green-200" role="status">
                    Cargando provincias y localidades...
                </p>
            )}

            {provincesError && (
                <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/40 dark:text-red-200" role="alert">
                    <p className="mb-2">{provincesError}</p>
                    <button
                        type="button"
                        className="rounded-md bg-red-600 px-3 py-1.5 font-semibold text-white transition hover:bg-red-700"
                        onClick={reloadProvinces}
                    >
                        Reintentar
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmitForm} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 dark:bg-gray-800 dark:border-gray-700">
                    {fields.map((field) => {
                        const hasError = Boolean(errors[field.name])
                        const errorId = `${field.name}-error`
                        const isProvince = field.name === "province"
                        const isLocality = field.name === "locality"
                        const selectDisabled = isProvince
                            ? isLocationDisabled
                            : isLocality
                                ? isLocationDisabled || !selectedProvince
                                : false

                        return (
                            <div className="flex flex-wrap" key={field.name}>
                                <label
                                    className="text-lg font-bold text-gray-900 mb-1 content-center dark:text-white"
                                    htmlFor={field.name}
                                >
                                    {field.label}:{" "}
                                </label>

                                {field.type === "select" ? (
                                    <select
                                        id={field.name}
                                        className={fieldClasses(hasError)}
                                        name={field.name}
                                        value={dataForm[field.name]}
                                        onChange={handleChangeInput}
                                        onBlur={handleBlurField}
                                        autoComplete={field.autoComplete}
                                        required={field.required}
                                        aria-required={field.required}
                                        aria-invalid={hasError}
                                        aria-describedby={hasError ? errorId : undefined}
                                        disabled={selectDisabled}
                                    >
                                        <option value="">
                                            {isProvince
                                                ? provincesLoading
                                                    ? "Cargando provincias..."
                                                    : "Seleccioná una provincia"
                                                : selectedProvince
                                                    ? "Seleccioná una localidad"
                                                    : "Seleccioná primero una provincia"}
                                        </option>

                                        {isProvince &&
                                            provinces.map((province) => (
                                                <option key={province.id} value={province.nombre}>
                                                    {province.nombre}
                                                </option>
                                            ))}

                                        {isLocality &&
                                            localities.map((locality) => (
                                                <option key={locality} value={locality}>
                                                    {locality}
                                                </option>
                                            ))}
                                    </select>
                                ) : (
                                    <input
                                        id={field.name}
                                        className={fieldClasses(hasError)}
                                        type={field.type}
                                        name={field.name}
                                        value={dataForm[field.name]}
                                        onChange={handleChangeInput}
                                        onBlur={handleBlurField}
                                        placeholder={field.placeholder}
                                        autoComplete={field.autoComplete}
                                        required={field.required}
                                        aria-required={field.required}
                                        aria-invalid={hasError}
                                        aria-describedby={hasError ? errorId : undefined}
                                        maxLength={field.maxLength}
                                        inputMode={field.inputMode}
                                    />
                                )}

                                {hasError && (
                                    <p
                                        id={errorId}
                                        className="w-full -mt-3 mb-3 text-sm font-medium text-red-600 dark:text-red-400"
                                    >
                                        {errors[field.name]}
                                    </p>
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className="flex flex-wrap justify-evenly gap-2 dark:bg-gray-800 dark:border-gray-700">
                    <Link
                        className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out"
                        to="/cart"
                    >
                        Volver al Carrito
                    </Link>
                    <button
                        className="inline-flex self-center m-1 px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-500 to-seagreen rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 no-underline hover:underline transition duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
                        type="submit"
                        disabled={submitDisabled}
                    >
                        Finalizar Compra
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormCheckout
