import express from "express";
import { clientController } from "../controllers";


export const clientRouter = express.Router();

clientRouter.post("/demo-request", clientController.requestDemo);