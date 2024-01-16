require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();
    console.log('Creando tablas');

    await connection.query(`
            CREATE TABLES users (
                id INTEGER PRIMARY KEY AUTO:INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_ TIMESTAMP
            );
        `);

    await connection.query(`
        CREATE TABLES notes (
            id INTEGER PRIMARY KEY AUTO:INCREMENT,
            user_id INTEGER NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_ TIMESTAMP
        );
    `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
