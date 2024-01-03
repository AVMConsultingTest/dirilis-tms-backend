import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { HttpError } from "../utils";

export const getPayablesSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      active_trucks: 1,
      active_trailers: 1,
      trucks_in_shop: 1,
      trailers_in_shop: 1,
      parking_lot: 1,
      office_building: 1,
    };
    res.status(200).json(data);
  }
  catch (error) {
    next(error);
  }
};

export const getPayablesPaymentsSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      fleet_payment: 1,
      real_estate_payment: 1,
      operational_payment: 1,
      upcoming_fleet_payment: 1,
      upcoming_real_estate_payment: 1,
      upcoming_operational_payment: 1,
    };
    res.status(200).json(data);
  }
  catch (error) {
    next(error);
  }
};
