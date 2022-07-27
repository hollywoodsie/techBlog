import { UserService } from '../services/index.js';

export const register = async (req, res, next) => {
  try {
    const newUser = await UserService.createUser(req, res);
    res.status(200).json({ status: 200, ...newUser, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Registration failed' });
  }
};
export const login = async (req, res, next) => {
  try {
    const loggedUser = await UserService.loginUser(req, res);
    res.status(200).json({ status: 200, ...loggedUser, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Login Failed' });
  }
};
export const getMe = async (req, res, next) => {
  try {
    const me = await UserService.getUser(req, res);
    res.status(200).json({ status: 200, ...me, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Not authorized' });
  }
};
