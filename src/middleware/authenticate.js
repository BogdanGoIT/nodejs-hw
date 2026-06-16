import createHttpError from 'http-errors';
import Session from '../models/session.js';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;

  // Перевіряємо наявність кукі
  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  // Шукаємо сесію
  const session = await Session.findOne({ accessToken });

  // 1. Якщо такої сесії нема, повертаємо помилку
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  // Перевіряємо термін дії access токена
  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired');
  }

  // Якщо з токеном все добре і сесія існує, шукаємо користувача
  const user = await User.findOne({ _id: session.userId });

  // 6. Якщо користувача не знайдено
  if (!user) {
    throw createHttpError(401);
  }

  // Якщо користувач існує, додаємо його до запиту
  req.user = user;

  // 8. Передаємо управління далі
  next();
};

export default authenticate;
