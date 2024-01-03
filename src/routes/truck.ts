import { Router } from "express";
import { truckController } from "../controllers";
import { uploadFile } from "../middlewares";

export const truckRouter = Router();

truckRouter.get("/", truckController.getMany);
truckRouter.get("/all", truckController.getAll);
truckRouter.get("/:truck_id", truckController.getOne);
truckRouter.post("/", truckController.create);
truckRouter.put("/:truck_id", truckController.update);
truckRouter.delete("/:truck_id", truckController.remove);
truckRouter.post("/upload-excel", uploadFile.single("file"), truckController.createMany);