import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';
import Session from '../models/session.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(400, 'Email in use');
  }
  // Хешуємо пароль
  const hashPassword = await bcrypt.hash(password, 10);

  // Створюємо користувача
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const session = createSession(newUser._id);
  setSessionCookies(res, session);

  // Відправляємо дані користувача (без пароля) у відповіді
  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Перевіряємо чи користувач з такою поштою існує
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  // Порівнюємо хеші паролів
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: user._id });

  const session = createSession(user._id);
  setSessionCookies(res, session);

  res.status(200).json(user);
};
