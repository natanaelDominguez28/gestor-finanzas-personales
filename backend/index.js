require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {mongoose} = require('./database/database');


const app = express();

//middlewares
app.use(express.json());
app.use(cors({origin: [
    'https://gestor-finanzas-personales.gilt.vercel.app',
    'http://localhost:5173'],
    credentials: true
}));

//rutas
app.use('/auth', require('./routes/auth.route')); 
app.use('/transacciones', require('./routes/transaccion.route'));


//settings
app.set('port', process.env.PORT || 3000);

//start server
app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
});