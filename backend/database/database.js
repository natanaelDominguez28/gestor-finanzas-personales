const mongoose = require('mongoose'); 
const URI = process.env.MONGO_URI || 'mongodb://localhost/transaccionesdb';
mongoose.connect(URI) 
.then(db=>console.log('DB is connected')) 
.catch(err=>console.error(err)) 

console.log('Conectando a:',URI);

module.exports = mongoose; 