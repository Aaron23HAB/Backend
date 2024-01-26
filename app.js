import "dotenv/config";
import express from 'express';
import morgan from 'morgan';


import {
  patchUser,
  userRegister,
  userLogin
}  from './src/controllers/Users/index.js'

import {
    createNote,
    deleteNote,
    getNote,
    getAllNotes,
    updateNote,
  } from './src/controllers/Notes/index.js'

const app = express();

app.use(express.json());
app.use(morgan('dev'));

//Rutas de usuario
app.post('/users', patchUser);
app.post('/users/', userRegister);
app.post('/login', userLogin);

//rutas de notas
app.get('/', getAllNotes);
app.get('/note/:id', getNote);
app.post('/', createNote);
app.delete('/', deleteNote);
app.patch('/note/:id', updateNote);



//lanzamos servidor
app.listen(3000, () => {
  console.log('Servidor escuchando');
});
