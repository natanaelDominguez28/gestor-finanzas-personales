import { useContext} from "react"
import { useNavigate } from "react-router-dom"
import { TransaccionContext } from "../context/TransaccionContext"

export const ListadoComponent = ({urlBase}) => {

    //   const [datos, setDatos] = useState([])
    
    //    const fetchTransacciones = async () => {
    //     try {
    //       const response = await fetch(urlBase)
    //       const data = await response.json()
    //       setDatos(data)
    //     } catch (error) {
    //       throw new Error(error)
    //     }
    //   }

    const {transacciones, loading, cargarDatos, getAuthHeaders} = useContext(TransaccionContext)

      const formatDate = (date) => {
        const dateFormat = new Date(date)
        const day = dateFormat.getDate() + 1
        const month = dateFormat.getMonth() + 1
        const year = dateFormat.getFullYear()

        return `${day}/${month}/${year}`

        // return dateFormat.toLocaleDateString() //devuelve la fecha en formato dd/mm/aaaa
      }

      //editar transaccion
      

      //eliminar transaccion
      const eliminarTransaccion = async (id) => {
        if (window.confirm('Estas seguro de eliminar la transaccion?')) {
            try{
                const response = await fetch(`${urlBase}/${id}`,{
                    method: 'DELETE',
                    headers: getAuthHeaders()
                })

                if (response.ok) {
                    await cargarDatos()
                    alert('Transaccion eliminada correctamente')
                }else{
                    alert('Error al eliminar la transaccion')
                }
            }catch(error){
                throw new Error(error)
            }
      }
    }

      const navigate = useNavigate()

      const handleClick = () => {
        navigate('/registro')
      }

      if (loading) {
        return <h1>Loading...</h1>
      }

  return (
    <>
    <h1 className="text-center">Movimientos</h1>
    <table className="table">
        <thead>
            <tr>
            <th scope="col">TIPO</th>
            <th scope="col">MONTO</th>
            <th scope="col">DESCRIPCION</th>
            <th scope='col'>FECHA</th>
            <th scope="col">ACCIONES</th>
            </tr>
        </thead>
        <tbody>
            {
                transacciones.map((t) => (
                    <tr key={t._id}>
                        <td>{t.tipo}</td>
                        <td>$ {t.monto}</td>
                        <td>{t.descripcion}</td>
                        <td>{formatDate(t.fecha)}</td>
                        <td><button type="button" className="btn btn-primary">Editar</button> <button type="button" className="btn btn-danger" onClick={() => eliminarTransaccion(t._id)}>Eliminar</button></td>
                    </tr>
                ))
            }
        </tbody>
        
    </table>
    <label className="fs-4 text-end mb-3">
        Total: $ {transacciones.reduce((total, item) => total + item.monto, 0)}
    </label>
    <br />
    <button type="button" className="btn btn-primary mt-3 " onClick={handleClick}>Nuevo Registro</button>
    </>
    
  )
}
