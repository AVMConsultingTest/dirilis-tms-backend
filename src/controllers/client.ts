import { NextFunction, Request, Response } from "express";

import { clientService } from "../services";
import { sendEmail } from "../utils/email";
import { clientValidator } from "../validators";

import { createDemoRequestEmailTemplate } from "../utils/emailTemplates";

import { HttpError } from "../utils";
import { SMTP_EMAIL } from "../configs";

export const requestDemo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = clientValidator.demoRequest.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const client = await clientService.create(payload);

    const emailTemplate = createDemoRequestEmailTemplate(payload);

    await sendEmail({
      email: client.email,
      subject: "Request Received",
      message: emailTemplate,
    });

    await sendEmail({
      email: SMTP_EMAIL,
      subject: "New User Request",
      message: `User email: ${client.email} have requested, please check within 24 hrs`,
    });

    res.status(201).json({ message: "request is received" });
  } catch (error) {
    next(error);
  }
};