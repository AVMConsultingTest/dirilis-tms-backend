import { Router } from "express";
import { serviceController } from "../controllers";

export const serviceRouter = Router();

serviceRouter.get("/", serviceController.getMany);
serviceRouter.get("/expiring-summary", serviceController.getSummary);
serviceRouter.get("/:service_id", serviceController.getOne);
serviceRouter.post("/", serviceController.create);
serviceRouter.put("/:service_id", serviceController.update);
serviceRouter.delete("/:service_id", serviceController.remove);