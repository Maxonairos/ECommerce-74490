import { initializeApp } from "firebase/app"
import { doc, getFirestore, writeBatch } from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyCHaYNXQdUrc7hSWaAauhm985mUJHuVfec",
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "gamerstore-74490.firebaseapp.com",
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || "gamerstore-74490",
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "gamerstore-74490.appspot.com",
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "975813769030",
    appId: process.env.VITE_FIREBASE_APP_ID || "1:975813769030:web:8660973cb6f17a007e9747"
}

const GEOREF_BASE_URL = "https://apis.datos.gob.ar/georef/api"
const MAX_LOCALITIES = 5000

const cleanText = (value) => String(value ?? "").replace(/\s+/g, " ").trim()

const uniqueSorted = (values) => {
    const unique = new Map()

    values.forEach((value) => {
        const cleaned = cleanText(value)
        if (cleaned) unique.set(cleaned.toLocaleLowerCase("es-AR"), cleaned)
    })

    return [...unique.values()].sort((a, b) => a.localeCompare(b, "es-AR"))
}

const fetchJson = async (url) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`La API de Georef respondió ${response.status}: ${url}`)
    }

    return response.json()
}

const seedLocations = async () => {
    console.log("Consultando provincias y localidades de Georef...")

    const [provincesResponse, localitiesResponse] = await Promise.all([
        fetchJson(`${GEOREF_BASE_URL}/provincias?max=100`),
        fetchJson(
            `${GEOREF_BASE_URL}/localidades?max=${MAX_LOCALITIES}&campos=id,nombre,provincia`
        )
    ])

    if (provincesResponse.total !== provincesResponse.provincias.length) {
        throw new Error("La API devolvió una lista incompleta de provincias.")
    }

    if (localitiesResponse.total > localitiesResponse.localidades.length) {
        throw new Error(
            "La API devolvió una lista incompleta de localidades. Aumentá MAX_LOCALITIES."
        )
    }

    const localitiesByProvince = new Map()

    localitiesResponse.localidades.forEach((locality) => {
        const provinceId = locality.provincia.id
        const currentLocalities = localitiesByProvince.get(provinceId) || []
        currentLocalities.push(locality.nombre)
        localitiesByProvince.set(provinceId, currentLocalities)
    })

    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const batch = writeBatch(db)
    let totalLocalities = 0

    provincesResponse.provincias.forEach((province) => {
        const localities = uniqueSorted(localitiesByProvince.get(province.id) || [])
        totalLocalities += localities.length

        batch.set(doc(db, "provincias", province.id), {
            id: province.id,
            nombre: cleanText(province.nombre),
            localidades: localities,
            totalLocalidades: localities.length,
            fuente: "Georef - datos.gob.ar",
            actualizadoEn: new Date().toISOString()
        })
    })

    await batch.commit()

    console.log(
        `Colección "provincias" actualizada: ${provincesResponse.provincias.length} provincias y ${totalLocalities} localidades.`
    )
}

seedLocations().catch((error) => {
    console.error("No se pudo generar la colección de provincias y localidades:", error)
    process.exitCode = 1
})
