import 'dotenv/config';
import getPool from './pool.js';

async function main() {
  let connection;

  try {
    connection = await getPool();
    console.log('Creando tablas');

    await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL
            );
        `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS categories (
          id INT PRIMARY KEY AUTO_INCREMENT,
          nombre VARCHAR(50) NOT NULL
      );
  `);

    const categoriasPredefinidas = [
      'Trabajo',
      'Personal',
      'Estudio',
      'Recordatorio',
    ];
    for (const categoria of categoriasPredefinidas) {
      await connection.query('INSERT INTO categories (nombre) VALUES (?)', [
        categoria,
      ]);
    }

    await connection.query(`
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          user_id INT NOT NULL,
          title VARCHAR(100) NOT NULL,
          texto TEXT NOT NULL,
          eliminated BOOLEAN DEFAULT FALSE
      );
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS note_categories (
          note_id INT,
          category_id INT,
          PRIMARY KEY (note_id, category_id),
          FOREIGN KEY (note_id) REFERENCES notes(id),
          FOREIGN KEY (category_id) REFERENCES categories(id)
      );
    `);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

main();
