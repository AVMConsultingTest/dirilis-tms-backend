import { Router } from "express";
import { userController } from "../controllers";

export const userRouter = Router();

userRouter.get("/", userController.getMany);
userRouter.get("/me", userController.getMe);
userRouter.get("/:user_id", userController.getOne);
userRouter.post("/", userController.create);