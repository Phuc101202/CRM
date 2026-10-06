import {Router} from 'express';
import {createNote, getNotes, updateNote, deleteNote} from '../controllers/note.controller.js';
import {protect} from '../middleware/auth.middleware.js';

const router = Router();
router.use(protect);

router.route('/').get(getNotes).post(createNote);
router.route('/:id').put(updateNote).delete(deleteNote);

export default router;