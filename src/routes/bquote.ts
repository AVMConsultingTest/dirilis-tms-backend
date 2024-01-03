import { Router } from "express";
import { bquoteController } from "../controllers";

export const bquoteRouter = Router();

bquoteRouter.get("/", bquoteController.getMany);
bquoteRouter.get("/:bquote_id", bquoteController.getOne);
bquoteRouter.post("/", bquoteController.create);
bquoteRouter.put("/:bquote_id", bquoteController.update);
bquoteRouter.delete("/:bquote_id", bquoteController.remove);