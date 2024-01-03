import { Router } from "express";
import { sambaCredentialController } from "../controllers";

export const sambaCredentialRouter = Router();

sambaCredentialRouter.get("/", sambaCredentialController.getMany);
sambaCredentialRouter.get("/:samba_credentia_id", sambaCredentialController.getOne);
sambaCredentialRouter.post("/", sambaCredentialController.create);
sambaCredentialRouter.put("/:samba_credentia_id", sambaCredentialController.update);
sambaCredentialRouter.delete("/:samba_credentia_id", sambaCredentialController.remove);