import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { TransaccionContext } from "../context/TransaccionContext"
import { toast } from "sonner"

export const ListadoComponent = ({urlBase}) => {

    const {transacciones, loading, cargarDatos, getAuthHeaders} = useContext(TransaccionContext)

    // Estado para saber qué fila se está editando y sus datos
    const [editandoId, setEditandoId] = useState(null)
    const [formData, setFormData] = useState({})

    const formatDate = (date) => {
        const dateFormat = new Date(date)
        const day = dateFormat.getDate() + 1
        const month = dateFormat.getMonth() + 1
        const year = dateFormat.getFullYear()
        return `${day}/${month}/${year}`
    }

    // Abre la fila en modo edición
    const handleEditar = (t) => {
        setEditandoId(t._id)
        setFormData({
            tipo: t.tipo,
            monto: t.monto,
            descripcion: t.descripcion,
            fecha: t.fecha.substring(0, 10) // formato yyyy-mm-dd para el input date
        })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleGuardar = async (id) => {
        try {
            const response = await fetch(`${urlBase}/${id}`, {
                method: 'PUT',
                headers: getAuthHeaders(),
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                await cargarDatos()
                setEditandoId(null)
                toast.success('Transacción actualizada correctamente!')
            } else {
                toast.error('Error al actualizar la transacción')
            }
        } catch (error) {
            toast.error('Error al actualizar la transacción')
        }
    }

    const handleCancelar = () => {
        setEditandoId(null)
        setFormData({})
    }

    const eliminarTransaccion = async (id) => {
        if (window.confirm('Estas seguro de eliminar la transaccion?')) {
            try {
                const response = await fetch(`${urlBase}/${id}`, {
                    method: 'DELETE',
                    headers: getAuthHeaders()
                })

                if (response.ok) {
                    await cargarDatos()
                    toast.success('Transacción eliminada correctamente!')
                } else {
                    toast.error('Error al eliminar la transacción')
                }
            } catch (error) {
                toast.error('Error al eliminar la transacción')
            }
        }
    }

    const navigate = useNavigate()

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
                {transacciones.map((t) => (
                    editandoId === t._id ? (
                        // Fila en modo edición
                        <tr key={t._id}>
                            <td>
                                <select name="tipo" value={formData.tipo} onChange={handleChange} className="form-select form-select-sm">
                                    <option value="ingreso">ingreso</option>
                                    <option value="gasto">gasto</option>
                                </select>
                            </td>
                            <td>
                                <input name="monto" type="number" value={formData.monto} onChange={handleChange} className="form-control form-control-sm" />
                            </td>
                            <td>
                                <input name="descripcion" type="text" value={formData.descripcion} onChange={handleChange} className="form-control form-control-sm" />
                            </td>
                            <td>
                                <input name="fecha" type="date" value={formData.fecha} onChange={handleChange} className="form-control form-control-sm" />
                            </td>
                            <td>
                                <button className="btn btn-success btn-sm me-1" onClick={() => handleGuardar(t._id)}>Guardar</button>
                                <button className="btn btn-secondary btn-sm" onClick={handleCancelar}>Cancelar</button>
                            </td>
                        </tr>
                    ) : (
                        // Fila normal
                        <tr key={t._id}>
                            <td>{t.tipo}</td>
                            <td>$ {t.monto}</td>
                            <td>{t.descripcion}</td>
                            <td>{formatDate(t.fecha)}</td>
                            <td>
                                <button className="btn btn-primary btn-sm me-1" onClick={() => handleEditar(t)}>Editar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => eliminarTransaccion(t._id)}>Eliminar</button>
                            </td>
                        </tr>
                    )
                ))}
            </tbody>
        </table>
        <label className="fs-4 text-end mb-3">
            Total: $ {transacciones.reduce((total, item) => total + item.monto, 0)}
        </label>
        <br />
        <button type="button" className="btn btn-primary mt-3" onClick={() => navigate('/registro')}>Nuevo Registro</button>
        </>
    )
}