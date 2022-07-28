import { UserService } from '../services/index.js';

export const register = async (req, res, next) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(200).json({ status: 200, ...newUser, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const login = async (req, res, next) => {
  try {
    const loggedUser = await UserService.loginUser(req.body);
    res.status(200).json({ status: 200, ...loggedUser, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getMe = async (req, res, next) => {
  try {
    const me = await UserService.getUser(req);
    !me
      ? res.status(401).json({ status: 401, message: 'Not authorized' })
      : res.status(200).json({ status: 200, ...me, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
