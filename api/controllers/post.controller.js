import { PostService } from '../services/index.js';

export const create = async (req, res, next) => {
  try {
    const newPost = await PostService.createPost(req);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req, res, next) => {
  try {
    const allPosts = await PostService.getAllPosts();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req, res, next) => {
  try {
    const onePost = await PostService.getOnePost(req.params);
    !onePost
      ? res.status(404).json({ message: 'Article not found' })
      : res.status(200).json(onePost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res, next) => {
  try {
    const removedPost = await PostService.removePost(req.params);
    !removedPost
      ? res.status(404).json({
          status: 404,
          deleted: false,
          message: 'Post not found',
        })
      : res.status(200).json({
          status: 200,
          deleted: true,
          message: 'Success',
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res, next) => {
  try {
    const updatedPost = await PostService.updatePost(req);
    !updatedPost
      ? res.status(404).json({
          status: 404,
          updated: false,
          message: 'Article not found',
        })
      : res.status(200).json({
          status: 200,
          updated: true,
          message: 'Success',
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTags = async (req, res, next) => {
  try {
    const tags = await PostService.getAllTags();

    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getSpecific = async (req, res, next) => {
  try {
    const allPosts = await PostService.getSpecificPosts(req);
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
