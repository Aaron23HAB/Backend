require('dotenv').config();

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

//Rutas



//middleware de 404



//middleware de gestión de errores


//lanzamos servidor
app.listen(3000, () => {
    console.log('Servidor escuchando')
});