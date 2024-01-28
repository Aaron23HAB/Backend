require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();
    console.log('Creando tablas');

    await connection.query(`
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO:INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL
            );
        `);

    await connection.query(`
        CREATE TABLE notes (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            title VARCHAR(100) NOT NULL,
            texto TEXT NOT NULL,
            categorie_id INT,
            eliminated BOOLEAN DEFAULT FALSE,
            FOREING KEY (user_id) REFERENCES users(id),
            FOREING KEY (categorie_id) REFERENCES categories(id)
        );
    `);

    await connection.query(`
          CREATE TABLE categories (
            id INT PRIMARY KEY AUTO_INCREMENT,
            nombre VARCHAR(50) NOT NULL
          )
    `)
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
