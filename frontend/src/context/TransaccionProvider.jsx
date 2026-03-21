import { useEffect, useState } from "react"
import { TransaccionContext } from "./TransaccionContext"


export const TransaccionProvider = ({children}) => {

    const [transacciones, setTransacciones] = useState([])
    const [loading, setLoading] = useState(false)

    const cargarDatos = async () => {
        setLoading(true)
        const res = await fetch('http://localhost:3000/transacciones')
        const data = await res.json()
        setTransacciones(data)
        setLoading(false)
    }

    useEffect(() => {
        cargarDatos()
    },[])

  return (
    <TransaccionContext.Provider value={{transacciones, loading, cargarDatos}}>
      {children}
    </TransaccionContext.Provider>
  )
}
