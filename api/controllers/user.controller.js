import { UserService } from '../services/index.js';

export const register = async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json(Array({ msg: error.message, param: error.cause }));
  }
};
export const login = async (req, res) => {
  try {
    const loggedUser = await UserService.loginUser(req.body);
    res.status(200).json(loggedUser);
  } catch (error) {
    res.status(400).json(Array({ msg: error.message, param: error.cause }));
  }
};
export const getMe = async (req, res) => {
  try {
    const me = await UserService.getUser(req);
    if (!me) {
      res.status(401).json({ message: 'Not authorized' });
    } else {
      res.status(200).json(me);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await UserService.updateUser(req.body);
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message, params: error.cause });
  }
};
