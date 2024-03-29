import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {userLogin, userRegister, patchUser} from './src/controllers/Users/index.js';
import {
  createNote,
  deleteNote,
  getNote,
  getAllNotes,
  editNote,
} from './src/controllers/Notes/index.js';
import { auth, handleError, notFound } from './src/middlewares/index.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));


app.use(notFound);
app.use(handleError);

//Rutas de usuario
app.patch('/user', auth, patchUser);
app.post('/register', userRegister);
app.post('/login', userLogin);

//rutas de notas
app.get('/', getAllNotes);
app.get('/note/:id', getNote);
app.post('/', createNote, auth);
app.delete('/', deleteNote, auth);
app.patch('/note/:id', editNote, auth);

app.use((error, req, res) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//lanzamos servidor
app.listen(3000, () => {
  console.log('Servidor escuchando');
});
