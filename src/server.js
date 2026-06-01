// src/server.js
import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRouter from './routes/notesRoutes.js';

const app = express();

// Глобальні middleware
app.use(logger); // 1. Логер першим — бачить усі запити
app.use(express.json()); // 2. Парсинг JSON-тіла
app.use(cors()); // 3. Дозвіл для запитів з інших доменів

// ...тут ваші маршрути

// підключаємо групу маршрутів нотатки
app.use(notesRouter);

// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

await connectMongoDB();

// Використовуємо значення з .env або дефолтний порт 3000
const port = Number(process.env.PORT) || 3000;

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
