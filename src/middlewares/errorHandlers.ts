/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { HttpError } from "../utils/HttpError";
import httpErrors from "http-errors";
import { ForeignKeyConstraintError, ValidationError } from "sequelize";

export function errorHandler(err: HttpError | Error | JsonWebTokenError | ForeignKeyConstraintError, req: Request, res: Response, next: NextFunction) {
  let statusCode = 500;
  let message = err.message || "Internal Server Error";

  (err);

  if(err instanceof ValidationError) {
    statusCode = 400; // bad request
    message = err.errors[0].message;
  }

  if(err instanceof ForeignKeyConstraintError) {
    statusCode = 400; // bad request
    message = err.original.detail || err.message;
  }

  if(err instanceof HttpError) {
    statusCode = err.statusCode;
  } else if(err instanceof JsonWebTokenError) {
    statusCode = 401; // unauthorized
  }
    
  const error = err as httpErrors.HttpError;
  if(statusCode === 500) {
    statusCode = error.status | error.statusCode | 500;
    console.error(err);
  }

  return res.status(statusCode).json({
    message
  });
}