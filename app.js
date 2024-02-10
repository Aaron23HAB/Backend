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
    editNote,
  } from './src/controllers/Notes/index.js'
  
import auth from "./src/middlewares/auth.js"

const app = express();
const cors = require('cors');


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Rutas de usuario
app.post('/users', patchUser);
app.post('/register', userRegister);
app.post('/login', userLogin);

//rutas de notas
app.get('/', getAllNotes);
app.get('/note/:id', getNote);
app.post('/', createNote, auth);
app.delete('/', deleteNote, auth);
app.patch('/note/:id', editNote, auth);



//lanzamos servidor
app.listen(3000, () => {
  console.log('Servidor escuchando');
});
