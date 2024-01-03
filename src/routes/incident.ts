import { Router } from "express";
import { incidentController } from "../controllers";

export const incidentRouter = Router();

incidentRouter.get("/", incidentController.getMany);
incidentRouter.get("/:incident_id", incidentController.getOne);
incidentRouter.post("/", incidentController.create);
incidentRouter.put("/:incident_id", incidentController.update);
incidentRouter.delete("/:incident_id", incidentController.remove);
