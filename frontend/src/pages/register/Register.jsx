import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TransaccionContext } from '../../context/TransaccionContext'

const RegisterPage = () => {
    const { registro } = useContext(TransaccionContext)
    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            await registro(nombre, email, password)
            navigate('/login')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <h2 className="text-center mb-4">Crear cuenta</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input type="text" className="form-control" value={nombre}
                            onChange={(e) => setNombre(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input type="password" className="form-control" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
                <p className="text-center mt-3">
                    ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage