import { Router } from "express";
import { deviceController } from "../controllers";

export const deviceRouter = Router();

deviceRouter.get("/", deviceController.getMany);
deviceRouter.get("/count", deviceController.getDevicesCount);
deviceRouter.get("/:device_id", deviceController.getOne);
deviceRouter.post("/", deviceController.create);
deviceRouter.put("/:device_id", deviceController.update);
deviceRouter.delete("/:device_id", deviceController.remove);

