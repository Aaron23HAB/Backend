const userRegister = async (req, res, next) => {
    try{
        console.log(req.url);
        console.log(req.method); 
        console.log(req.body);
        res.send({
            status: 'error',
            message: 'not implemented'
        })
    } catch(error) {
        next(error);
    }
};

export default userRegister;
