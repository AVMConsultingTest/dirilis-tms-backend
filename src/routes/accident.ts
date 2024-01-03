import { Router } from "express";
import { accidentController } from "../controllers";

export const accidentRouter = Router();

accidentRouter.get("/", accidentController.getMany);
accidentRouter.get("/samba", accidentController.getAccidensFromSamba);
accidentRouter.get("/:accident_id", accidentController.getOne);
accidentRouter.post("/", accidentController.create);
accidentRouter.put("/:accident_id", accidentController.update);
accidentRouter.delete("/:accident_id", accidentController.remove);