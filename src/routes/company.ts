import { Router } from "express";
import { companyController } from "../controllers";
import { isAuth } from "../middlewares";

export const companyRouter = Router();

companyRouter.post("/onboarding", isAuth, companyController.onboarding);
