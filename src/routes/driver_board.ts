import { Router } from "express";
import { driverBoardController } from "../controllers"; // Assuming you have the driver board controller

export const driverBoardsRouter = Router();

driverBoardsRouter.get("/", driverBoardController.getMany);

driverBoardsRouter.post("/", driverBoardController.create);

driverBoardsRouter.put("/:driver_board_id", driverBoardController.update);

driverBoardsRouter.delete("/:driver_board_id", driverBoardController.remove);

export default driverBoardsRouter;
