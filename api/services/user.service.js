import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );
    const { passwordHash, ...userData } = user._doc;
    return { userData, token };
  } catch (error) {
    throw Error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      throw Error('No users with this data');
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      throw Error('Invalid password');
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );
    const { passwordHash, ...userData } = user._doc;
    return { userData, token };
  } catch (error) {
    throw Error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      throw Error('No users with this data');
    }
    const { passwordHash, ...userData } = user._doc;

    return userData;
  } catch (error) {
    throw Error(error);
  }
};
