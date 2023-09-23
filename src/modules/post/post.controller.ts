import { RequestHandler } from "express";
import { PostService } from "./post.service";

const inserIntoDb: RequestHandler = async (req, res) => {
  try {
    const result = await PostService.inserIntoDb(req.body);
    res.send({
      success: true,
      message: "category created Successfully ",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const getAllPost: RequestHandler = async (req, res) => {
  const options = req?.query;
  try {
    const result = await PostService.getAllPost(options);
    res.send({
      success: true,
      message: "Post retrivie Successfully ",
      total:result.total,
      data: result.data,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  inserIntoDb,
  getAllPost,
};
