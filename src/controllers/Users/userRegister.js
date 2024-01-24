import generateError from "../../../helper";

const userRegister = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        
        if(!email || !password){
            throw generateError ('Debes proporcionar email y contraseña');
            
        }
        
    } catch(error) {
        next(error);
    }
};

export default userRegister;
