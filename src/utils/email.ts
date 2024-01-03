import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const sendEmail = async (options: Record<string, string>) => {
  try {
    ({
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const message = {
      from: "NebulaGTS",
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(message);
  } catch (error) {
    throw new Error(error.message);
  }
};