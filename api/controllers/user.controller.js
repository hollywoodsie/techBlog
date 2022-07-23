import { createUser, loginUser, getUser } from '../services/user.service.js';
import { validationResult } from 'express-validator';

export const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  try {
    const newUser = await createUser(req, res);
    res.status(200).json({ status: 200, ...newUser, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Registration failed' });
  }
};
export const login = async (req, res, next) => {
  try {
    const loggedUser = await loginUser(req, res);
    res.status(200).json({ status: 200, ...loggedUser, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Login Failed' });
  }
};
export const getMe = async (req, res, next) => {
  try {
    const me = await getUser(req, res);
    res.status(200).json({ status: 200, ...me, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Not authorized' });
  }
};
