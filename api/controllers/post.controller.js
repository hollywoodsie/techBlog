import { PostService } from '../services/index.js';

export const create = async (req, res) => {
  try {
    const newPost = await PostService.createPost(req);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const allPosts = await PostService.getAllPosts(req);
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const onePost = await PostService.getOnePost(req.params);
    if (!onePost) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      res.status(200).json(onePost);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const removedPost = await PostService.removePost(req.params);
    if (!removedPost) {
      res.status(404).json({
        status: 404,
        deleted: false,
        message: 'Post not found',
      });
    } else {
      res.status(200).json({
        status: 200,
        deleted: true,
        message: 'Success',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const updatedPost = await PostService.updatePost(req);
    if (!updatedPost) {
      res.status(404).json({
        status: 404,
        updated: false,
        message: 'Article not found',
      });
    } else {
      res.status(200).json({
        status: 200,
        updated: true,
        message: 'Success',
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await PostService.getAllTags();

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
