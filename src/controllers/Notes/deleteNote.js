import generateError from "../../../helper.js";
import { getNotebyId, deleteNotes} from "../../db/notes.js";


const deleteNote = async (req, res, next) => {
    
    try{
        const {id} = req.params;

        const note = await getNotebyId(id);

        if(req.userId !== note.user_id) {
            throw generateError('No tienes los permisos para dicha acción', 401)
        }

        await deleteNotes(id);

        res.status(200).json({
            status: 'ok',
            message: `La nota con id ${id} ha sido eliminada correctamente`,
            deletedNote: note
          });
    } catch(error) {
      next(error);
  }
  };

  export default deleteNote;