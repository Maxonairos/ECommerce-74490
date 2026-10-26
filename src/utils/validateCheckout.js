const NAME_PATTERN = /^[\p{L}][\p{L}\s'.-]*$/u
const ADDRESS_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}\s.,'°º#/-]*$/u
const DIGITS_PATTERN = /^\d+$/
const ADDRESS_NUMBER_PATTERN = /^(?:\d{1,5}(?:\s?[A-Za-z]{1,3})?|s\/n)$/i
const FLOOR_PATTERN = /^(?:\d{1,3}°?|[A-Za-z]{1,2})$/
const DEPARTMENT_PATTERN = /^[A-Za-z0-9-]{1,10}$/
const ZIPCODE_PATTERN = /^(?:\d{4}|[A-Z]\d{4}[A-Z]{3})$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const checkoutFields = [
    "name",
    "surname",
    "areacode",
    "phone",
    "address",
    "number",
    "floor",
    "department",
    "province",
    "locality",
    "zipcode",
    "email",
    "repeatemail"
]

const cleanText = (value) => String(value ?? "").replace(/\s+/g, " ").trim()

const validateName = (value, label) => {
    const name = cleanText(value)

    if (!name) return `Ingresá tu ${label}.`
    if (name.length < 2) return `El ${label} debe tener al menos 2 caracteres.`
    if (name.length > 50) return `El ${label} no puede superar los 50 caracteres.`
    if (!NAME_PATTERN.test(name)) {
        return `El ${label} solo puede contener letras, espacios, puntos, apóstrofes y guiones.`
    }

    return ""
}

const validateEmail = (value, emptyMessage = "Ingresá tu email.") => {
    const email = cleanText(value).toLowerCase()

    if (!email) return emptyMessage
    if (email.length > 254) return "El email es demasiado largo."
    if (!EMAIL_PATTERN.test(email)) return "Ingresá un email válido, por ejemplo nombre@dominio.com."

    return ""
}

export const normalizeCheckoutForm = (dataForm) => ({
    ...dataForm,
    name: cleanText(dataForm.name),
    surname: cleanText(dataForm.surname),
    areacode: cleanText(dataForm.areacode),
    phone: cleanText(dataForm.phone),
    address: cleanText(dataForm.address),
    number: cleanText(dataForm.number),
    floor: cleanText(dataForm.floor),
    department: cleanText(dataForm.department).toUpperCase(),
    province: cleanText(dataForm.province),
    locality: cleanText(dataForm.locality),
    zipcode: cleanText(dataForm.zipcode).toUpperCase(),
    email: cleanText(dataForm.email).toLowerCase(),
    repeatemail: cleanText(dataForm.repeatemail).toLowerCase()
})

export const validateCheckoutField = (fieldName, value, dataForm, provinces = []) => {
    const form = { ...dataForm, [fieldName]: value }

    switch (fieldName) {
        case "name":
            return validateName(value, "nombre")
        case "surname":
            return validateName(value, "apellido")
        case "areacode": {
            const areacode = cleanText(value)
            if (!areacode) return "Ingresá el código de área."
            if (!DIGITS_PATTERN.test(areacode)) return "El código de área debe contener solo números."
            if (areacode.length < 2 || areacode.length > 4) {
                return "El código de área debe tener entre 2 y 4 dígitos."
            }
            return ""
        }
        case "phone": {
            const phone = cleanText(value)
            if (!phone) return "Ingresá tu teléfono."
            if (!DIGITS_PATTERN.test(phone)) return "El teléfono debe contener solo números."
            if (phone.length < 6 || phone.length > 8) {
                return "El teléfono debe tener entre 6 y 8 dígitos, sin el 15."
            }
            return ""
        }
        case "address": {
            const address = cleanText(value)
            if (!address) return "Ingresá tu dirección."
            if (address.length < 3) return "La dirección debe tener al menos 3 caracteres."
            if (address.length > 100) return "La dirección no puede superar los 100 caracteres."
            if (!ADDRESS_PATTERN.test(address)) return "La dirección contiene caracteres no válidos."
            return ""
        }
        case "number": {
            const addressNumber = cleanText(value)
            if (!addressNumber) return "Ingresá la altura o el número de tu dirección."
            if (addressNumber.length > 10) return "El número de dirección es demasiado largo."
            if (!ADDRESS_NUMBER_PATTERN.test(addressNumber)) {
                return "Ingresá solo números o S/N. Podés agregar BIS."
            }
            return ""
        }
        case "floor": {
            const floor = cleanText(value)
            if (!floor) return ""
            if (!FLOOR_PATTERN.test(floor)) return "Ingresá un piso válido, por ejemplo 3, PB o 1°."
            return ""
        }
        case "department": {
            const department = cleanText(value)
            if (!department) return ""
            if (!DEPARTMENT_PATTERN.test(department)) {
                return "El departamento debe tener hasta 10 letras o números."
            }
            return ""
        }
        case "province": {
            const province = cleanText(value)
            if (!province) return "Seleccioná una provincia."
            if (!provinces.some((item) => item.nombre === province)) {
                return "Seleccioná una provincia válida."
            }
            return ""
        }
        case "locality": {
            const locality = cleanText(value)
            if (!locality) return "Seleccioná una localidad."

            const province = provinces.find((item) => item.nombre === cleanText(form.province))
            if (!province) return "Seleccioná primero una provincia."
            if (!province.localidades.includes(locality)) {
                return "Seleccioná una localidad válida para la provincia elegida."
            }
            return ""
        }
        case "zipcode": {
            const zipcode = cleanText(value).toUpperCase()
            if (!zipcode) return "Ingresá tu código postal."
            if (!ZIPCODE_PATTERN.test(zipcode)) {
                return "Ingresá un código postal válido, por ejemplo 5011 o X5011FEM."
            }
            return ""
        }
        case "email":
            return validateEmail(value)
        case "repeatemail": {
            const emailError = validateEmail(value, "Repetí tu email.")
            if (emailError) return emailError
            if (cleanText(value).toLowerCase() !== cleanText(form.email).toLowerCase()) {
                return "Los emails no coinciden."
            }
            return ""
        }
        default:
            return ""
    }
}

export const validateCheckoutForm = (dataForm, provinces = []) =>
    checkoutFields.reduce((errors, fieldName) => {
        const error = validateCheckoutField(fieldName, dataForm[fieldName], dataForm, provinces)
        if (error) errors[fieldName] = error
        return errors
    }, {})
