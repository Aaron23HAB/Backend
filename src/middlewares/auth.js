import jwt from 'jsonwebtoken';
import generateError from "../../helper"

const auth =(req, res, next) => {
    try{
        const {authorization } =req.headers;

        if (!authorization) {
            return generateError("Se requiere el header 'authorization'para continuar",401);
        }
        
    } finally{
        console.log();
    }
}

export default auth;