import createHttpError from 'http-errors';

import { Note } from '../models/note.js';

// Отримати список усіх нотаток
export const getAllNotes = async (req, res) => {
  const { _id: userId } = req.user;
  const { page = 1, perPage = 10, tag, search } = req.query;
  console.log(search, tag);
  const skip = (page - 1) * perPage;
  const notesQuery = Note.find();
  if (userId) {
    notesQuery.where('userId').equals(userId);
  }
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
  const { _id: userId } = req.user;
  const note = await Note.findOne({ _id: noteId, userId }); // throw new Error()

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
  const { _id: userId } = req.user;
  const note = await Note.create({ ...req.body, userId });
  console.log(note);

  res.status(201).json(note);
};

// видалення існуючої нотатки за її ідентифікатором
export const deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const { _id: userId } = req.user;
  const deleteNote = await Note.findOneAndDelete({
    _id: noteId,
    userId,
  });

  if (!deleteNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(deleteNote);
};

// оновлення існуючої нотатки за її ідентифікатором
export const updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { _id: userId } = req.user;

  const updateNote = await Note.findOneAndUpdate(
    { _id: noteId, userId }, // Шукаємо по id
    req.body,
    { returnDocument: 'after', runValidators: true }, // повертаємо оновлений документ
  );

  if (!updateNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updateNote);
};
