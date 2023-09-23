import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.get("/user", (req, res) => {
  res.send("server is roking roll ");
});

router.post("/create-user", UserController.insertIntoDb);
router.post("/update-profile", UserController.insertOrUpdateProfile);
router.get("/get-all", UserController.getAllUser);
router.get("/:id", UserController.getSingleUser);

export const userRoutes = router;
