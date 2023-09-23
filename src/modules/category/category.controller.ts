import { RequestHandler } from "express";

import { CatergoryService } from "./category.service";

const inserIntoDb: RequestHandler = async (req, res) => {
  try {
    const result = await CatergoryService.inserIntoDb(req.body);
    res.send({
      success: true,
      message: "category created Successfully ",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const CategoryController = {
  inserIntoDb,
};
