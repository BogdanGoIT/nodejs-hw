import { Router } from 'express';

import { getAllNotes, getNoteById } from '../controllers/notesController.js';

const notesRouter = Router();

notesRouter.get('/notes', getAllNotes);

// Конкретна нотатка за id
notesRouter.get('/notes/:noteId', getNoteById);

export default notesRouter;
