import { Router } from 'express';
import notesRouter from './notesRouter';

const router = Router();

router.use('/note', notesRouter);

export default router;
