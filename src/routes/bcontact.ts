import { Router } from "express";
import { bcontactController } from "../controllers";

export const bcontactRouter = Router();

bcontactRouter.get("/", bcontactController.getMany);
bcontactRouter.get("/:bcontact_id", bcontactController.getOne);
bcontactRouter.post("/", bcontactController.create);
bcontactRouter.put("/:bcontact_id", bcontactController.update);
bcontactRouter.delete("/:bcontact_id", bcontactController.remove);