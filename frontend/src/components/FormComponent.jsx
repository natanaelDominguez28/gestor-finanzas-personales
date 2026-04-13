import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransaccionContext } from '../context/TransaccionContext'
import { toast } from 'sonner'

export const FormComponent = ({urlBase}) => {

  const {cargarDatos, getAuthHeaders} = useContext(TransaccionContext)
    
  const navigate = useNavigate()

  const maxDate = new Date().toISOString().split("T")[0]

  const [monto, setMonto] = useState(0)
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState("ingreso")
  const [fecha, setFecha] = useState(maxDate)

  const form = { monto, descripcion, tipo, fecha }


 const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      if (fecha > maxDate) {
        toast.error("La fecha no puede ser mayor a la actual.")
        return
      }
      if (monto <= 0) {
        toast.error("El monto debe ser un valor positivo.")
        return
      }
      const response = await fetch(urlBase,{
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...form,
          monto:parseFloat(monto)
        })
      })

      if (response.ok) {
        toast.success("Transacción exitosa!")
        navigate('/listado')
      }else{
        toast.error("No se pudo realizar la transacción")
      }
    }catch(error){
      toast.error("Error al enviar el formulario")
    }
    
    await cargarDatos()
    navigate('/home')
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="txtMonto" className="form-label">Monto:</label>
              <input type="number" className="form-control" id="txtMonto" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder='0.00' min={1} />
          </div>
          <div className="mb-3">
              <label htmlFor="txtDescripcion" className="form-label">Descripcion:</label>
              <input type="text" className="form-control" id="txtDescripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          </div>
          <div className="mb-3">
              <label htmlFor="txtTipo" className="form-label">Tipo:</label>
              <select className="form-select" name="tipo" id="txtTipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="ingreso">Ingreso</option>
                  <option value="gasto">Gasto</option>
              </select>
          </div>
          <div className="mb-3">
              <label htmlFor="txtFecha" className="form-label">Fecha:</label>
              <input type="date" className="form-control" id="txtFecha" value={fecha} onChange={(e) => setFecha(e.target.value)} max={maxDate} />
          </div>
          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>
    </>
  )
}
