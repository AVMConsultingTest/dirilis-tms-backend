import { Router } from "express";
import { roleController } from "../controllers";

export const roleRouter = Router();

roleRouter.get("/", roleController.getMany);
roleRouter.get("/:role_id", roleController.getOne);
roleRouter.post("/", roleController.create);
roleRouter.put("/:role_id", roleController.update);
roleRouter.delete("/:role_id", roleController.remove);