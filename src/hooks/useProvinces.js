import { useCallback, useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import db from "../db/db.js"

const cleanText = (value) => String(value ?? "").replace(/\s+/g, " ").trim()

const mapProvince = (document) => {
    const data = document.data()
    const localities = Array.isArray(data.localidades)
        ? [...new Set(data.localidades.map(cleanText).filter(Boolean))]
        : []

    return {
        id: document.id,
        nombre: cleanText(data.nombre),
        localidades: localities.sort((a, b) => a.localeCompare(b, "es-AR"))
    }
}

const useProvinces = () => {
    const [provinces, setProvinces] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [reloadKey, setReloadKey] = useState(0)

    useEffect(() => {
        let isActive = true

        setLoading(true)
        setError(null)

        getDocs(collection(db, "provincias"))
            .then((snapshot) => {
                if (!isActive) return

                const nextProvinces = snapshot.docs
                    .map(mapProvince)
                    .filter((province) => province.nombre && province.localidades.length)
                    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es-AR"))

                if (!nextProvinces.length) {
                    throw new Error("La colección de provincias está vacía.")
                }

                setProvinces(nextProvinces)
            })
            .catch((requestError) => {
                if (!isActive) return
                console.error("No se pudieron cargar las provincias y localidades:", requestError)
                setProvinces([])
                setError("No pudimos cargar las provincias y localidades. Intentá nuevamente.")
            })
            .finally(() => {
                if (isActive) setLoading(false)
            })

        return () => {
            isActive = false
        }
    }, [reloadKey])

    const reload = useCallback(() => {
        setReloadKey((currentKey) => currentKey + 1)
    }, [])

    return { provinces, loading, error, reload }
}

export default useProvinces
