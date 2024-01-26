import generateError from '../../helper.js';
import bcrypt from 'bcrypt';
import getPool from './db.js';

// Crear usuario en base de datos y devuelve id
const createUser = async (name, email, password) => {
  let connection;

  try {
    connection = await getPool();

    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE email = ?

        `[email]
    );

    if (user.length > 0) {
      throw generateError('Ya existe un usuario con este email', 409);
    }

    //encriptamiento password
    const hashPassword = await bcrypt.hash(password, 10);

    //creacion user
    const [newUser] = await connection.query(
        `
        INSERT INTO users (name, nickname, email, password) VALUES(?,?,?,?)
        `[name, email, hashPassword]
    );
    //devuelve ID
    return newUser.insertId;

  } finally {
    if (connection) connection.release();
  }
  // comprobar que no exista otro user con igual mail

  //
};

export default createUser;