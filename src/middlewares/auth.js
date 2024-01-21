import jwt from 'jsonwebtoken';

const auth =(req, res, next) => {
    try{
        const {authorization } =req.headers;

        if (!authorization) {
            return generateError("Se requiere el header 'authorization'para continuar",401);
        }
        
    }
}