import 'dotenv/config';
import getPool from './db.js';

async function main() {
  let connection;

  try {
    connection = await getPool();
    console.log('Creando tablas');

    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL
            );
        `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id INT PRIMARY KEY AUTO_INCREMENT,
          nombre VARCHAR(50) NOT NULL
        )
  `);
        
    await connection.query(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            user_id INT NOT NULL,
            title VARCHAR(100) NOT NULL,
            texto TEXT NOT NULL,
            categorie_id INT,
            eliminated BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (categorie_id) REFERENCES categories(id)
        );
    `);

    
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release;
    process.exit();
  }
}

main();
