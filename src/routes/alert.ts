import { Router } from "express";
import { alertController } from "../controllers";

export const alertRouter = Router();

alertRouter.get("/", alertController.getMany);
alertRouter.get("/summary", alertController.summary);
alertRouter.get("/:alert_id", alertController.getOne);
alertRouter.post("/", alertController.create);
alertRouter.put("/:alert_id", alertController.update);
alertRouter.delete("/:alert_id", alertController.remove);

