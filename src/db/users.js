import generateError from '../utils/GenerateError.js';
import bcrypt from 'bcrypt';
import getPool from './pool.js';

//devuelve la info publica de un user por id
const getUserById = async (id) => {
  let pool;
  let connection;

  try {
    pool = await getPool();
    connection = await pool.getConnection();

    const [result] = await connection.query(
      `
      SELECT id, name, email FROM users WHERE id=?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('Usuario no encontrado', 404);
    }
    return result[0];
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

// Crear usuario en base de datos y devuelve id
const createUser = async (name, email, password) => {
  let pool;
  let connection;

  try {
    pool = await getPool();
    connection = await pool.getConnection();

    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE email = ?

        `,
      [email]
    );

    if (user.length > 0) {
      throw generateError('Ya existe un usuario con este email', 409);
    }

    //encriptamiento password
    const hashPassword = await bcrypt.hash(password, 10);

    //creacion user
    const [newUser] = await connection.query(
      `
        INSERT INTO users (name, email, password) VALUES(?,?,?)
        `,
      [name, email, hashPassword]
    );

    return newUser.insertId;
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

const updateUser = async (userId, newData) => {
  let pool;
  let connection;

  try {
    pool = await getPool();
    connection = await pool.getConnection();

    const [existingUser] = await connection.query(
      `
        SELECT * FROM users WHERE id = ?
      `,
      [userId]
    );

    if (existingUser.length === 0) {
      throw generateError('Usuario no encontrado', 404);
    }

    const { name, email, password } = newData;

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await connection.query(
      `
        UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?
      `,
      [
        name || existingUser[0].name,
        email || existingUser[0].email,
        hashedPassword || existingUser[0].password,
        userId,
      ]
    );

    return 'Usuario actualizado correctamente';
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

const getUserByEmail = async (email) => {
  let pool;
  let connection;

  try {
    pool = await getPool();
    connection = await pool.getConnection();

    const [result] = await connection.query(
      `
      SELECT id, name, email FROM users WHERE email=?
      `,
      [email]
    );

    if (result.length === 0) {
      throw generateError('Usuario no encontrado', 404);
    }
    return result[0];
  } finally {
    if (pool && pool.releaseConnection) {
      pool.releaseConnection(connection);
    }
  }
};

export { createUser, getUserById, updateUser, getUserByEmail };
