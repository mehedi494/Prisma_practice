import { RequestHandler } from "express";
import { UserService } from "./user.service";

const insertIntoDb: RequestHandler = async (req, res) => {
  try {
    const result = await UserService.inserIntoDb(req.body);
    res.send({
      success: true,
      message: "user created Successfully ",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const insertOrUpdateProfile: RequestHandler = async (req, res) => {
  try {
    const result = await UserService.insertOrUpdateProfile(req.body);
    res.send({
      success: true,
      message: "user update Successfully ",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const getAllUser: RequestHandler = async (req, res) => {
  try {
    const result = await UserService.getAllUser();
    res.send({
      success: true,
      message: "User Retrive Successfully ",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const getSingleUser: RequestHandler = async (req, res) => {
  try {
    const result = await UserService.getSingleUser(parseInt(req.params.id));
    res.send({
      success: true,
      message: "User Retrive Successfully ",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const UserController = {
  insertIntoDb,
  insertOrUpdateProfile,
  getAllUser,
  getSingleUser,
};
