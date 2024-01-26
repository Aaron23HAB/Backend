
import generateError from "../../../helper.js";
import createUser from "../../db/users.js";

const userRegister = async (req, res, next) => {
    try{
        const { name, email, password } = req.body;
        
        if(!name || !email || !password ){
            throw generateError ('Debes proporcionar email y contraseña');
        }

        const id = await createUser(name, email, password);

        res.send({
            status: 'ok',
            message: `User created with id: ${id}`
        })
        
    } catch(error) {
        next(error);
    }
};

export default userRegister;
