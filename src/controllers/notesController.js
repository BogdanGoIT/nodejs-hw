import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

// Отримати список усіх нотаток
export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

// Отримати одну нотатку за id
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

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
    { returnDocument: 'after' }, // повертаємо оновлений документ
  );

  if (!updateNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updateNote);
};
