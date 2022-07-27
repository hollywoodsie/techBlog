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

export const removePost = async (req, res) => {
  try {
    const postId = req.params.id;
    return await PostModel.findOneAndDelete({
      _id: postId,
    });
  } catch (error) {
    throw Error(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    return await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
  } catch (error) {
    throw Error(error);
  }
};
export const getAllTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5);
    return posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
  } catch (error) {
    throw Error(error);
  }
};
