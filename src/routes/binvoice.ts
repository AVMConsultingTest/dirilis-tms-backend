import { Router } from "express";
import { binvoiceController } from "../controllers";

export const binvoiceRouter = Router();

binvoiceRouter.get("/", binvoiceController.getMany);
binvoiceRouter.get("/:binvoice_id", binvoiceController.getOne);
binvoiceRouter.post("/", binvoiceController.create);
binvoiceRouter.put("/:binvoice_id", binvoiceController.update);
binvoiceRouter.delete("/:binvoice_id", binvoiceController.remove);