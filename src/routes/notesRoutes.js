import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

import {
  createNoteSchema,
  getAllNotesSchema,
} from '../validations/notesValidation.js';

const notesRouter = Router();

notesRouter.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
notesRouter.get('/notes/:noteId', getNoteById);
notesRouter.post(
  '/notes',
  celebrate(createNoteSchema, { abortEarly: false }),
  createNote,
);
notesRouter.delete('/notes/:noteId', deleteNote);
notesRouter.patch('/notes/:noteId', updateNote);

export default notesRouter;
