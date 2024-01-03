import { Router } from "express";
import { locationController } from "../controllers";

export const locationRouter = Router();

locationRouter.get("/", locationController.getMany);
locationRouter.get("/search/:location_name", locationController.searchByName);
locationRouter.get("/:location_id", locationController.getOne);
locationRouter.post("/", locationController.create);
locationRouter.put("/:location_id", locationController.update);
locationRouter.delete("/:location_id", locationController.remove);