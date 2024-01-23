const patchUser = async (req, res, next) => {
    try{
        res.send({
            status: 'error',
            message: 'not implemented'
        })
    } catch(error) {
        next(error);
    }
};

export default patchUser;