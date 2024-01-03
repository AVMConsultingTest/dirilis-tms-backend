import { Router } from "express";
import { applicantController } from "../controllers";

export const applicantRouter = Router();

applicantRouter.get("/", applicantController.getMany);
applicantRouter.get("/summary", applicantController.summary);
applicantRouter.get("/:applicant_id", applicantController.getOne);
applicantRouter.post("/", applicantController.create);
applicantRouter.put("/:applicant_id", applicantController.update);
applicantRouter.delete("/:applicant_id", applicantController.remove);