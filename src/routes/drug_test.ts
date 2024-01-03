import { Router } from "express";
import { drugTestController } from "../controllers";

export const drugTestRouter = Router();

drugTestRouter.get("/", drugTestController.getMany);
drugTestRouter.get("/:drug_test_id", drugTestController.getOne);
drugTestRouter.post("/", drugTestController.create);
drugTestRouter.put("/:drug_test_id", drugTestController.update);
drugTestRouter.delete("/:drug_test_id", drugTestController.remove);