import './App.css'
import { ListadoComponent } from './components/ListadoComponent'
import { NavbarComponent } from './components/NavbarComponent' 
import { Navigate, Route, Routes } from 'react-router-dom'
import { FormComponent } from './components/FormComponent'
import Home from './pages/home/Home'
import { TransaccionProvider } from './context/TransaccionProvider'

function App() {
  const urlBase = 'http://localhost:3000/transacciones'
  return (
    <>
    <TransaccionProvider>
      <NavbarComponent />
      <div className="container">
        <Routes>
          <Route path='/home' element={<Home urlBase={urlBase} />} />
          <Route path='/registro' element={<FormComponent urlBase={urlBase} />} />
          <Route path='/listado' element={<ListadoComponent urlBase={urlBase} />} />
          <Route path='/*' element={<Navigate to="/home" />} />
        </Routes>
      </div>
      </TransaccionProvider>
    </>
  )
}

export default App
