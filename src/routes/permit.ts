import { Router } from "express";
import { permitController } from "../controllers";

export const permitRouter = Router();

permitRouter.get("/", permitController.getMany);
permitRouter.get("/expiring-summary", permitController.expiringSummary);
permitRouter.get("/:permit_id", permitController.getOne);
permitRouter.post("/", permitController.create);
permitRouter.put("/:permit_id", permitController.update);
permitRouter.delete("/:permit_id", permitController.remove);
