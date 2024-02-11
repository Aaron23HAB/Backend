import { getNotebyId } from '../../db/notes.js';

const getNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await getNotebyId(id);
    res.status(200).json({
      status: 'ok',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

export default getNote;
