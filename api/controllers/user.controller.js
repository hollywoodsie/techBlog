import { UserService } from '../services/index.js';

export const register = async (req, res, next) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const login = async (req, res, next) => {
  try {
    const loggedUser = await UserService.loginUser(req.body);
    res.status(200).json(loggedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getMe = async (req, res, next) => {
  try {
    const me = await UserService.getUser(req);
    !me
      ? res.status(401).json({ message: 'Not authorized' })
      : res.status(200).json(me);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await UserService.updateUser(req.body);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
