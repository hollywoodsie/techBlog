import {
  createPost,
  getAllPosts,
  getOnePost,
} from '../services/post.service.js';

export const create = async (req, res, next) => {
  try {
    const newPost = await createPost(req, res);
    res.status(200).json({ status: 200, data: newPost, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error while post creation' });
  }
};

export const getAll = async (req, res, next) => {
  try {
    const allPosts = await getAllPosts(req, res);
    res.status(200).json({ status: 200, allPosts, message: 'Success' });
  } catch (error) {
    res.status(404).json({ message: 'No articles found' });
  }
};

export const getOne = async (req, res, next) => {
  try {
    const onePost = await getOnePost(req, res);

    res.status(200).json({ status: 200, onePost, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: 'No article found(cont)' });
  }
};
