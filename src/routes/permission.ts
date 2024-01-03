import { Router } from "express";
import { permissionController } from "../controllers";

export const permissionRouter = Router();

permissionRouter.put("/:permission_id", permissionController.update);
permissionRouter.delete("/:permission_id", permissionController.remove);