import generateError from '../../utils/GenerateError.js';
import { createUser } from '../../db/users.js';
import { registerValidate } from '../../utils/joi.js';
import { getUserByEmail } from '../../db/users.js';

const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validar los datos de entrada
    registerValidate({ name, email, password });

    // Verificar si el usuario ya existe
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw generateError('Ya existe un usuario con este email', 409);
    }

    // Crear el usuario
    const id = await createUser(name, email, password);

    // Enviar respuesta con el ID del usuario creado
    res.status(201).json({
      status: 'success',
      message: `Usuario creado con email: ${email}`,
      userId: id,
    });
  } catch (error) {
    next(error);
  }
};

export {userRegister};
