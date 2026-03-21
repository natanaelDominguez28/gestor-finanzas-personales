import './App.css'
import { ListadoComponent } from './components/ListadoComponent'
import { NavbarComponent } from './components/NavbarComponent'
import { Navigate, Route, Routes } from 'react-router-dom'
import { FormComponent } from './components/FormComponent'
import Home from './pages/home/Home'
import LoginPage from './pages/login/Login'
import RegisterPage from './pages/register/Register'
import { TransaccionProvider } from './context/TransaccionProvider'
import { RutaPrivada } from './components/RutaPrivada'

const urlBase = 'http://localhost:3000/transacciones'

function App() {
  return (
    <TransaccionProvider>
      <NavbarComponent />
      <div className="container">
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/home' element={<RutaPrivada><Home urlBase={urlBase} /></RutaPrivada>} />
          <Route path='/registro' element={<RutaPrivada><FormComponent urlBase={urlBase} /></RutaPrivada>} />
          <Route path='/listado' element={<RutaPrivada><ListadoComponent urlBase={urlBase} /></RutaPrivada>} />
          <Route path='/*' element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </TransaccionProvider>
  )
}

export default App