import { updateUser } from '../../db/users.js';
import bcrypt from 'bcrypt';
import { editUserValidate } from '../../utils/joi.js';

const patchUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    editUserValidate({ name, email, password });

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUserId = await updateUser(req.userId, email, hashedPassword);

    res.status(200).json({
      status: 'ok',
      message: `Perfil actualizado para el usuario con ID: ${updatedUserId}`,
    });
  } catch (error) {
    next(error);
  }
};

export default patchUser;
