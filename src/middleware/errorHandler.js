import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  // Якщо помилка створена через http-errors
  if (err instanceof HttpError) {
    const { status, message } = err;
    return res.status(status).json({
      message,
    });
  }
  const isProd = process.env.NODE_ENV === 'production';
  const message = isProd ? 'Some error' : err.message;

  // Усі інші помилки — як внутрішні
  res.status(500).json({
    message,
  });
};
