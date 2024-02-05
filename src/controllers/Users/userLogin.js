import generateError from "../../../helper.js"
import getUserById from "../../db/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userLogin = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            throw generateError ('Debes ingresar email y contraseña', 401);
        }

        //recojo datos de DB
        const user = await getUserById(email);

        //contraseñas coinciden
        const validPassword = await bcrypt.compare(password, user.password);

        if(!validPassword){
            throw generateError ('La contraseña o el email son incorrectos', 401);
        }

        //payload token
        const payload = {id: user.id}

        //token

        const token = jwt.sign(payload, process.env.SECRET, {expiresIn: '90d'});

        res.send({
            status: 'error',
            message: 'not implemented'
        })
        res.status(200).json({token: token });
    } catch(error) { 
        next(error);
    }
};

export default userLogin;