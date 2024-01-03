import { Router } from "express";
import { bcustomerContactController, bcustomerController } from "../controllers";

export const bcustomerRouter = Router();

bcustomerRouter.get("/", bcustomerController.getMany);
bcustomerRouter.get("/:bcustomer_id", bcustomerController.getOne);
bcustomerRouter.post("/", bcustomerController.create);
bcustomerRouter.put("/:bcustomer_id", bcustomerController.update);
bcustomerRouter.delete("/:bcustomer_id", bcustomerController.remove);

bcustomerRouter.post("/:bcustomer_id/contacts", bcustomerContactController.create);
bcustomerRouter.put("/:bcustomer_id/contacts/:bcustomer_contact_id", bcustomerContactController.update);
bcustomerRouter.delete("/:bcustomer_id/contacts/:bcustomer_contact_id", bcustomerContactController.remove);