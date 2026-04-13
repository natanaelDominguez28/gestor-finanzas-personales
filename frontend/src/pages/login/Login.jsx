import { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { TransaccionContext } from '../../context/TransaccionContext'
import { toast } from 'sonner'

const LoginPage = () => {
    const { login } = useContext(TransaccionContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(email, password)
            toast.success('Bienvenido!')
            navigate('/home')
        } catch (err) {
            toast.error('Credenciales incorrectas')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <h2 className="text-center mb-4">Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Entrar'}
                    </button>
                </form>
                <p className="text-center mt-3">
                    ¿No tenés cuenta? <Link to="/register">Registrate</Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage