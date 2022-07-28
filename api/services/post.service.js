import PostModel from '../models/post.model.js';

export const createPost = async (data) => {
  try {
    const doc = new PostModel({
      title: data.title,
      text: data.text,
      imageUrl: data.imageUrl,
      tags: data.tags,
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
    return await PostModel.find().populate('user');
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
        tags: data.body.tags,
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
    const posts = await PostModel.find().limit(5);
    return posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
  } catch (error) {
    console.log(error);
    throw Error('Error while getting tags');
  }
};
