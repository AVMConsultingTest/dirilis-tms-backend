import { Router } from "express";
import { brokerController } from "../controllers";

export const brokerRouter = Router();

brokerRouter.get("/", brokerController.getMany);
brokerRouter.get("/:broker_id", brokerController.getOne);
brokerRouter.post("/", brokerController.create);
brokerRouter.put("/:broker_id", brokerController.update);
brokerRouter.delete("/:broker_id", brokerController.remove);