import jwt from 'jsonwebtoken';
import generateError from '../utils/GenerateError.js';

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return generateError(
        "Se requiere el header 'authorization'para continuar",
        401
      );
    }

    //comprobamos token correcto

    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Token incorrecto', 401);
    }

    //metemos info del token en la request para utilizar en controller
    req.auth = token;

    //saltamos al controller
    next();
  } catch (error) {
    next(error);
  }
};

export { auth };
