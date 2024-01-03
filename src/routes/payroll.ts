import { Router } from "express";
import { payrollController } from "../controllers"; // Assuming you have the driver board controller

export const payrollRouter = Router();

payrollRouter.get("/summary", payrollController.getPayrollSummary);

export default payrollRouter;
