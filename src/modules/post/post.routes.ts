import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.inserIntoDb);
router.get("/", PostController.getAllPost);
router.patch("/update-post/:id", PostController.updatePost);
router.delete("/delete/:id", PostController.deletePost);

export const PostRoutes = router;
