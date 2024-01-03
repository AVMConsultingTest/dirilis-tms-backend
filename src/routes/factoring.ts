import { Router } from "express";
import { factoringController } from "../controllers";

export const factoringRouter = Router();

factoringRouter.get("/", factoringController.getMany);
factoringRouter.get("/:factoring_id", factoringController.getOne);
factoringRouter.get("/:factoring_id/send", factoringController.sendOne);
factoringRouter.post("/", factoringController.create);
factoringRouter.put("/:factoring_id", factoringController.update);
factoringRouter.delete("/:factoring_id", factoringController.remove);