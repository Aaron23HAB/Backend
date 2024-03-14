import { createUser } from '../../db/users.js';
import { registerValidate } from '../../utils/joi.js';

const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    registerValidate({name, email, password})

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
