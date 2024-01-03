import { Router } from "express";
import { loadController, loadOfferController } from "../controllers";

export const loadRouter = Router();

loadRouter.get("/", loadController.getMany);
loadRouter.get("/driver/:driver_id", loadController.getManyByDriver);
loadRouter.get("/:load_id", loadController.getOne);
loadRouter.post("/", loadController.create);
loadRouter.put("/:load_id", loadController.update);
loadRouter.delete("/:load_id", loadController.remove);

// load-offer
loadRouter.get("/:load_id/load-offers", loadOfferController.getMany);
loadRouter.get("/:load_id/load-offers/:load_offer_id", loadOfferController.getOne);
loadRouter.post("/:load_id/load-offers", loadOfferController.create);
loadRouter.put("/:load_id/load-offers/:load_offer_id", loadOfferController.update);
loadRouter.delete("/:load_id/load-offers/:load_offer_id", loadOfferController.remove);

