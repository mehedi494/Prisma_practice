import cors from "cors";
import express, { urlencoded } from "express";
import { CategoryRoutes } from "./modules/category/category.routes";
import { PostRoutes } from "./modules/post/post.routes";
import { userRoutes } from "./modules/user/user.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/post", PostRoutes);

export default app;
