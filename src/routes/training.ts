import { Router } from "express";
import { trainingController } from "../controllers";

export const trainingRouter = Router();

trainingRouter.get("/", trainingController.getMany);
trainingRouter.get("/search/:driver_id", trainingController.searchByDriverId);
trainingRouter.get("/:training_id", trainingController.getOne);
trainingRouter.post("/", trainingController.create);
trainingRouter.put("/:training_id", trainingController.update);
trainingRouter.delete("/:training_id", trainingController.remove);