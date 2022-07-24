import { text } from 'express';
import PostModel from '../models/post.model.js';

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();

    return post;
  } catch (error) {
    throw Error(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    return posts;
  } catch (error) {
    throw Error(error);
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          throw Error(err);
        }
        if (!doc) {
          throw Error('No article found');
        }
        console.log(doc);
        return doc;
      }
    ).populate('user');
  } catch (error) {
    throw Error(error);
  }
};
