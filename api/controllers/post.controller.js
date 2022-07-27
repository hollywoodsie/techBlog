import { PostService } from '../services/index.js';

export const create = async (req, res, next) => {
  try {
    const newPost = await PostService.createPost(req, res);
    res.status(200).json({ status: 200, data: newPost, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while post creation' });
  }
};

export const getAll = async (req, res, next) => {
  try {
    const allPosts = await PostService.getAllPosts(req, res);
    res.status(200).json({ status: 200, data: allPosts, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'No articles found' });
  }
};

export const getOne = async (req, res, next) => {
  try {
    const onePost = await PostService.getOnePost(req, res);
    !onePost
      ? res.status(404).json({ status: 404, message: 'Article not found' })
      : res
          .status(200)
          .json({ status: 200, data: onePost, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while getting post' });
  }
};

export const remove = async (req, res, next) => {
  try {
    const removedPost = await PostService.removePost(req, res);
    !removedPost
      ? res.status(404).json({
          status: 404,
          deleted: false,
          message: 'Article not found',
        })
      : res.status(200).json({
          status: 200,
          deleted: true,
          message: 'Success',
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while article removing' });
  }
};

export const update = async (req, res, next) => {
  try {
    const updatedPost = await PostService.updatePost(req, res);
    !updatedPost
      ? res.status(404).json({
          status: 404,
          deleted: false,
          message: 'Article not found',
        })
      : res.status(200).json({
          status: 200,
          updated: true,
          message: 'Success',
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while article updating' });
  }
};

export const getTags = async (req, res, next) => {
  try {
    const tags = await PostService.getAllTags(req, res);

    res.status(200).json({
      status: 200,
      data: tags,
      message: 'Success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error while getting tags' });
  }
};
