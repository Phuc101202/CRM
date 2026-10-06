import {Router} from 'express';
import {createContact, getContacts, getContact, updateContact, deleteContact} from '../controllers/contact.controller.js';
import {protect} from '../middleware/auth.middleware.js';

const router = Router();
router.use(protect);

router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

export default router;