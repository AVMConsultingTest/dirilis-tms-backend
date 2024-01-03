import { Router } from "express";
import { vendorController } from "../controllers";

export const vendorRouter = Router();

vendorRouter.get("/", vendorController.getMany);
vendorRouter.get("/:vendor_id", vendorController.getOne);
vendorRouter.post("/", vendorController.create);
vendorRouter.put("/:vendor_id", vendorController.update);
vendorRouter.delete("/:vendor_id", vendorController.remove);