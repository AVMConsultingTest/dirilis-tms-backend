import { Router } from "express";
import { trailerController } from "../controllers";
import { uploadFile } from "../middlewares";

export const trailerRouter = Router();

trailerRouter.get("/", trailerController.getMany);
trailerRouter.get("/all", trailerController.getAll);
trailerRouter.get("/:trailer_id", trailerController.getOne);
trailerRouter.post("/", trailerController.create);
trailerRouter.put("/:trailer_id", trailerController.update);
trailerRouter.delete("/:trailer_id", trailerController.remove);
trailerRouter.post("/upload-excel", uploadFile.single("file"), trailerController.createMany);