import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import swaggerDocs from "./swagger/swagger";
import { root } from "./routes";
import { errorHandler } from "./middlewares/errorHandlers";
import { NODE_ENV, sequelize } from "./configs";

export const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (NODE_ENV === "production") {
  app.use(morgan("common"));
}

app.use(helmet());

app.use("/api/v1/", root);

if (NODE_ENV === "production") {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connection established.");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
} else {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Database schema synchronized.");
    })
    .catch((err) => {
      console.error("Database sync error:", err);
    });
}

app.use(errorHandler);

swaggerDocs(app);