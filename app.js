import "dotenv/config";
import express from 'express';
import morgan from 'morgan';


import {
  newUserController,
  getUserController,
  loginController,
}  from './src/controllers/Users/userRegister.js'

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
app.post('/user', newUserController);
app.post('/user/:id', getUserController);
app.post('/login', loginController);

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
