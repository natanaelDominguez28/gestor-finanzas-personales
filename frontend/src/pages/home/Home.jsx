import React, { useContext, useMemo } from 'react'
import { TransaccionContext } from '../../context/TransaccionContext'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Home = () => {

    const {transacciones, loading} = useContext(TransaccionContext)

    const {datosBarra, datosTorta, totales} = useMemo(()=>{
        const resumen = transacciones.reduce((acc, t) => {
            const monto = Number(t.monto)
            if (t.tipo === 'ingreso') {
                acc.ingresos += monto
            }else{
                acc.gastos += monto
            }
            return acc
        },{ingresos:0, gastos:0})

        return {
            totales: resumen,
            datosBarra: [{name: 'Balance Actual', ingresos: resumen.ingresos, gastos: resumen.gastos}],
            datosTorta: [
                {name: 'Ingresos', value: resumen.ingresos},
                {name: 'Gastos', value: resumen.gastos}
            ]
        }
    },[transacciones])

    const COLORS= ['#4caf50','#f44336']

    if (loading) return <div className='loading'>Cargando datos...</div>

  return (
    <>
    <div style={{padding:'20px', maxWidth:'1200px', margin:'0 auto'}}>
      <h1 className='text-center'>Mis transacciones</h1>
    
    <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)',gap:'20px', marginBottom:'30px'}}>
        {/* grafico de torta con porcentaje de ingresos y egresos */}
        <Card title='Ingresos' value={totales.ingresos} color="#4caf50" />
        <Card title='Gastos' value={totales.gastos} color="#f44336" />
        <Card title='Balance Neto' value={totales.ingresos - totales.gastos} color="#2196f3" />
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}}>
        {/* grafico de barras */}
        <section>
            <h3 className='text-center'>Flujo</h3>
            <div style={{width:'100%',height:'300px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datosBarra}>
                        <CartesianGrid strokeDashArray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ingresos" fill="#4caf50" radius={[4,4,0,0]} />
                        <Bar dataKey="gastos" fill="#f44336" radius={[4,4,0,0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
        {/* grafico de torta */}
        <section>
            <h3 className='text-center'>Balance</h3>
            <div style={{width:'100%',height:'300px'}}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={datosTorta}
                        cx="50%" cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value">
                            {datosTorta.map((entry, index)=>(
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </section>
    </div>
    </div>
    </>
    
  )
}

const Card = ({ title, value, color }) => (
        <div style={{ border: `2px solid ${color}`, borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
            <h4 style={{ margin: 0, color: '#666' }}>{title}</h4>
            <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '10px 0', color: color }}>
            ${value.toLocaleString()}
            </p>
        </div>
    );

export default Home
