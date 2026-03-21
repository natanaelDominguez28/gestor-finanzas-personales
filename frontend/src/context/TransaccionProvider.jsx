import { useEffect, useState } from "react"
import { TransaccionContext } from "./TransaccionContext"


const URL_BASE = 'http://localhost:3000'

export const TransaccionProvider = ({ children }) => {

    const [transacciones, setTransacciones] = useState([])
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [usuario, setUsuario] = useState(localStorage.getItem('usuario') || null)

    const getAuthHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    })

    const cargarDatos = async () => {
        if (!token) return
        setLoading(true)
        const res = await fetch(`${URL_BASE}/transacciones`, {
            headers: getAuthHeaders()
        })
        const data = await res.json()
        setTransacciones(data)
        setLoading(false)
    }

    const login = async (email, password) => {
        const res = await fetch(`${URL_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.mensaje)

        localStorage.setItem('token', data.token)
        localStorage.setItem('usuario', data.nombre)
        setToken(data.token)
        setUsuario(data.nombre)
    }

    const registro = async (nombre, email, password) => {
        const res = await fetch(`${URL_BASE}/auth/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.mensaje)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        setToken(null)
        setUsuario(null)
        setTransacciones([])
    }

    useEffect(() => {
        if (token) cargarDatos()
    }, [token])

    return (
        <TransaccionContext.Provider value={{
            transacciones, loading, cargarDatos,
            token, usuario, login, registro, logout,
            getAuthHeaders
        }}>
            {children}
        </TransaccionContext.Provider>
    )
}