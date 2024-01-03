import { Router } from "express";
import { cdlController, driverController } from "../controllers";
import { uploadFile } from "../middlewares";

export const driversRouter = Router();

driversRouter.post("/", driverController.create);
driversRouter.post("/upload-excel", uploadFile.single("file"), driverController.createMany);
driversRouter.get("/", driverController.getMany);
driversRouter.get("/all", driverController.getAll);
driversRouter.get("/summary", driverController.summary);
driversRouter.get("/:driver_id", driverController.getOne);
driversRouter.put("/:driver_id", driverController.update);
driversRouter.delete("/:driver_id", driverController.remove);

driversRouter.post("/:driver_id/cdls", cdlController.create);
driversRouter.put("/:driver_id/cdls/:cdl_id", cdlController.update);
driversRouter.delete("/:driver_id/cdls/:cdl_id", cdlController.remove);

export default driversRouter;
