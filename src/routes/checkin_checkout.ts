import { Router } from "express";
import { checkinCheckoutController } from "../controllers";

export const checkinCheckoutRouter = Router();

checkinCheckoutRouter.get("/", checkinCheckoutController.getMany);
checkinCheckoutRouter.get("/:checkin_checkout_id", checkinCheckoutController.getOne);
checkinCheckoutRouter.post("/", checkinCheckoutController.create);
checkinCheckoutRouter.put("/:checkin_checkout_id", checkinCheckoutController.update);
checkinCheckoutRouter.delete("/:checkin_checkout_id", checkinCheckoutController.remove);