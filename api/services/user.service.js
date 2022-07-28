import UserModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (data) => {
  try {
    const password = data.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: data.email,
      fullName: data.fullName,
      avatarUrl: data.avatarUrl,
      passwordHash: hash,
    });

    const alreadyExists = await UserModel.findOne({ email: data.email });
    if (alreadyExists) {
      throw Error('User with this e-mail already exists');
    }

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
    console.log(error);
    throw Error('Error while creating user');
  }
};

export const loginUser = async (data) => {
  try {
    const user = await UserModel.findOne({ email: data.email });

    const isValidPass = user
      ? await bcrypt.compare(data.password, user._doc.passwordHash)
      : null;

    if (!isValidPass) {
      throw Error('Invalid e-mail or password');
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
    console.log(error);
    throw Error(error);
  }
};

export const getUser = async (data) => {
  try {
    const user = await UserModel.findById(data.userId);
    const { passwordHash, ...userData } = user._doc;

    return userData;
  } catch (error) {
    console.log(error);
    throw Error('Error while getting user');
  }
};
