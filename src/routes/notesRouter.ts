import { Router } from 'express';
import notesController from '../controllers/notesController';

const notesRouter = Router();

notesRouter.get('/', notesController.getNotesList);
notesRouter.get('/:id', notesController.getNote);
notesRouter.post('/', notesController.addNote);
notesRouter.put('/:id', notesController.updateNote);
notesRouter.delete('/:id', notesController.deleteNote);

export default notesRouter;
