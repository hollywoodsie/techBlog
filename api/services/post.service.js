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

    return await doc.save();
  } catch (error) {
    throw Error(error);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    return await PostModel.find().populate('user');
  } catch (error) {
    throw Error(error);
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;
    return PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },

      {
        returnDocument: 'after',
      }
    ).populate('user');
  } catch (error) {
    throw Error(error);
  }
};
