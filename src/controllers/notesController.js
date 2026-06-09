import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

// Отримати список усіх нотаток
export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;
  console.log(search, tag);
  const skip = (page - 1) * perPage;
  const notesQuery = Note.find();
  if (tag) {
    notesQuery.where('tag').equals(tag);
  }
  if (search) {
    notesQuery.where({
      $or: [
        {
          title: { $regex: search, $options: 'i' },
        },
        {
          content: { $regex: search, $options: 'i' },
        },
      ],
    });
  }
  const [notes, totalNotes] = await Promise.all([
    notesQuery.clone().skip(skip).limit(perPage),
    notesQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);
  res.status(200).json({ page, perPage, totalNotes, totalPages, notes });
};

// Отримати одну нотатку за id
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId); // throw new Error()

  if (!note) {
    throw createHttpError(404, 'Note not found');
    // return res.status(404).json({ message: 'Note not found' });
    // const error = new Error('Note not found');
    // error.status = 404;
    // throw error;
  }

  res.status(200).json(note);
};

// створення нової нотатки
export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  console.log(note);

  res.status(201).json(note);
};

// видалення існуючої нотатки за її ідентифікатором
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const deleteNote = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!deleteNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(deleteNote);
};

// оновлення існуючої нотатки за її ідентифікатором
export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const updateNote = await Note.findOneAndUpdate(
    { _id: noteId }, // Шукаємо по id
    req.body,
    { returnDocument: 'after', runValidators: true }, // повертаємо оновлений документ
  );

  if (!updateNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updateNote);
};
