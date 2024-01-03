import { Router } from "express";
import { bcarrierController } from "../controllers";

export const bcarrierRouter = Router();

bcarrierRouter.get("/", bcarrierController.getMany);
bcarrierRouter.get("/:bcarrier_id", bcarrierController.getOne);
bcarrierRouter.post("/", bcarrierController.create);
bcarrierRouter.put("/:bcarrier_id", bcarrierController.update);
bcarrierRouter.delete("/:bcarrier_id", bcarrierController.remove);