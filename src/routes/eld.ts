import { Router } from "express";
import { eldAlertController, eldDriverEntityController, eldIftaDriverController, eldIftaFuelPurchaseController, eldIftaIdlingEventController, eldIftaSummaryController, eldIftaTripReportController, eldIftaVehicleController, eldTrailerEntityController, eldTruckEntityController } from "../controllers";

export const eldRouter = Router();

eldRouter.get("/entities/drivers", eldDriverEntityController.getMany);
eldRouter.get("/entities/trucks", eldTruckEntityController.getMany);
eldRouter.get("/entities/trailers", eldTrailerEntityController.getMany);

eldRouter.get("/alerts", eldAlertController.getMany);

eldRouter.get("/ifta/drivers", eldIftaDriverController.getMany);
eldRouter.get("/ifta/fuel-purchases", eldIftaFuelPurchaseController.getMany);
eldRouter.get("/ifta/idling-events", eldIftaIdlingEventController.getMany);
eldRouter.get("/ifta/summary", eldIftaSummaryController.getMany);
eldRouter.get("/ifta/trip-reports", eldIftaTripReportController.getMany);
eldRouter.get("/ifta/vehicles", eldIftaVehicleController.getMany);