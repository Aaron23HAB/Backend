import generateError from '../../../helper.js';
import {updateUser} from '../../db/users.js';
import bcrypt from 'bcrypt';

const patchUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      throw generateError(
        'Debes proporcionar al menos un campo para actualizar',
        400
      );
    }

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
