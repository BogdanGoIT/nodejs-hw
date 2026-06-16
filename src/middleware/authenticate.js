import createHttpError from 'http-errors';
import User from '../models/user.js';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  console.log(req.body);
  const { sessionId, accessToken } = req.cookies;

  // 1. Перевіряємо наявність кукі
  if (!sessionId || !accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  // 2. Якщо все ок, шукаємо сесію
  const session = await Session.findOne({ _id: sessionId, accessToken });

  // 3. Якщо такої сесії нема, повертаємо помилку
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  // 4. Перевіряємо термін дії access токена
  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired');
  }

  // 5. Якщо з токеном все добре і сесія існує, шукаємо користувача
  const user = await User.findOne({ _id: session.userId });

  // 6. Якщо користувача не знайдено
  if (!user) {
    throw createHttpError(401);
  }

  // 7. Якщо користувач існує, додаємо його до запиту
  req.user = user;

  // 8. Передаємо управління далі
  next();
};
