import { getNotebyId } from "../../db/notes";

const getNote = async (req, res, next) => {
    try{
        const {id} = req.params
        const note = await getNotebyId(id);
      res.send({
          status: 'ok',
          data: note
      })
  } catch(error) {
      next(error);
  }
  };

  export default getNote;