import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TransaccionContext } from '../context/TransaccionContext'

export const RutaPrivada = ({ children }) => {
    const { token } = useContext(TransaccionContext)
    return token ? children : <Navigate to="/login" />
}