import generateError from '../../../helper.js';
import { createUser } from '../../db/users.js';

const userRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError('Debes proporcionar email y contraseña', 400);
    }

    const id = await createUser(email, password);

    res.status(201).json({
      status: 'ok',
      message: `Usuario creado con email: ${email}`,
      userId: id,
    });
  } catch (error) {
    next(error);
  }
};

export { userRegister };
