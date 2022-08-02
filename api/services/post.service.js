import PostModel from '../models/post.model.js';
import { unique } from '../utils/uniqueTags.js';

export const createPost = async (data) => {
  try {
    const doc = new PostModel({
      title: data.body.title,
      text: data.body.text,
      imageUrl: data.body.imageUrl,
      tags: unique(data.body.tags.split(',')),
      user: data.userId,
    });

    return await doc.save();
  } catch (error) {
    console.log(error);
    throw Error('Error while creating post');
  }
};

export const getAllPosts = async () => {
  try {
    return (await PostModel.find().populate('user')).reverse();
  } catch (error) {
    console.log(error);
    throw Error('Error while getting all posts');
  }
};

export const getOnePost = async (data) => {
  try {
    const postId = data.id;

    return await PostModel.findOneAndUpdate(
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
    console.log(error);
    throw Error('Error while getting post');
  }
};

export const removePost = async (data) => {
  try {
    const postId = data.id;
    const postExists = await PostModel.findOne({
      _id: postId,
    });

    return await PostModel.findOneAndDelete({
      _id: postId,
    });
  } catch (error) {
    console.log(error);
    throw Error('Error while removing post');
  }
};

export const updatePost = async (data) => {
  try {
    const postId = data.params.id;
    return await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: data.body.title,
        text: data.body.text,
        imageUrl: data.body.imageUrl,
        tags: unique(data.body.tags.split(',')),
        user: data.userId,
      }
    );
  } catch (error) {
    console.log(error);
    throw Error('Error while updating post');
  }
};
export const getAllTags = async () => {
  try {
    const posts = await PostModel.find().limit(10);
    return unique(
      posts
        .map((obj) => obj.tags.reverse())
        .reverse()
        .flat()
        .slice(0, 10)
    );
  } catch (error) {
    console.log(error);
    throw Error('Error while getting tags');
  }
};

export const getSpecificPosts = async (data) => {
  const tag = data.params.tag;
  try {
    return (await PostModel.find().populate('user'))
      .reverse()
      .filter((obj) => obj.tags.includes(tag));
  } catch (error) {
    console.log(error);
    throw Error('Error while getting all posts');
  }
};
