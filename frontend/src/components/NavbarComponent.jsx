import { NavLink } from "react-router-dom"

export const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <NavLink to="/home" className="navbar-brand" href="#">Home</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink to="/registro" className="nav-link active" aria-current="page" href="#">Registro</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/listado" className="nav-link" href="#">Listado</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
