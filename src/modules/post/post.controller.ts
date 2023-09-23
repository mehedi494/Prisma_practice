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
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    res.send(error);
  }
};
const updatePost: RequestHandler = async (req, res) => {
  const id = +req.params.id;
  const payload = req.body;
  // console.log(id, title);
  try {
    const result = await PostService.updatePost(id, payload);
    res.send({
      success: true,
      message: "Post update Successfully ",

      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const deletePost: RequestHandler = async (req, res) => {
  const id = +req.params.id;

  // console.log(id, title);
  try {
    const result = await PostService.deletePost(id);
    res.send({
      success: true,
      message: "Deleted Successfully ",

      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const learnAggregation: RequestHandler = async (req, res) => {
 


  try {
    const result = await PostService.learnAggregation();
    res.send({
      success: true,
      message: "Aggregate Data",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  inserIntoDb,
  getAllPost,
  updatePost,
  deletePost,
  learnAggregation
};
