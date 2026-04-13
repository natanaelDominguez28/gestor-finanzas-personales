import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { TransaccionContext } from "../context/TransaccionContext"
import { toast } from "sonner"

export const NavbarComponent = () => {
  const { usuario, logout, token } = useContext(TransaccionContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Hasta luego!')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink to="/home" className="navbar-brand">Home</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {token && (
              <>
                <li className="nav-item">
                  <NavLink to="/registro" className="nav-link" aria-current="page">Registro</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/listado" className="nav-link">Listado</NavLink>
                </li>
              </>
            )}
          </ul>

          {token && (
            <div className="d-flex align-items-center gap-2">
              <span className="navbar-text">Hola, {usuario} 👋</span>
              <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
