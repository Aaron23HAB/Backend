import generateError from "../../../helper";
import { getNotebyId, deleteNotes} from "../../db/notes";


const deleteNote = async (req, res, next) => {
    
    try{
        const {id} = req.params;

        const note = await getNotebyId(id);

        if(req.userId !== note.user_id) {
            throw generateError('Estas intentando borrar una nota que no es tuya', 401)
        }

        await deleteNotes(id);

      res.send({
          status: 'ok',
          data: note
      })
    } catch(error) {
      next(error);
  }
  };

  export default deleteNote;