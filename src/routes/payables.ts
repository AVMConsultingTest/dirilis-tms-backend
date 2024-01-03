import { Router } from "express";
import { payablesController } from "../controllers"; // Assuming you have the driver board controller

export const payablesRouter = Router();

payablesRouter.get("/summary", payablesController.getPayablesSummary);
payablesRouter.get("/payments-summary", payablesController.getPayablesPaymentsSummary);

export default payablesRouter;
