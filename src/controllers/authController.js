import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../models/user.js';

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

  // Відправляємо дані користувача (без пароля) у відповіді
  res.status(201).json(newUser);
};
