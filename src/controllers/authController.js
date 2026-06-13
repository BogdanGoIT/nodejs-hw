import createHttpError from 'http-errors';
import User from '../models/user.js';

export const registerUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createHttpError(400, 'Email in use');
  }
  const newUser = await User.create(req.body);
  console.log(newUser.toJSON);
  res.status(201).json(newUser);
};
