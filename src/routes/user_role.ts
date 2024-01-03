import { Router } from "express";
import { userRoleController } from "../controllers";

export const userRoleRouter = Router();

userRoleRouter.post("/", userRoleController.create);
userRoleRouter.delete("/:user_role_id", userRoleController.remove);