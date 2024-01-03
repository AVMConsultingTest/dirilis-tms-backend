import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { User } from "../models/user";
import { Truck } from "../models/truck";
import { Permit } from "../models/permit";
import sequelize from "sequelize";
import { Inspection } from "../models";

export const gethighlightedMetrics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ["company_id"] });
    if (!user || !user.company_id) return next(createHttpError(400, "User must belong to a company to view highlighted metrics"));

    const activeTruck = await Truck.count({
      where: { carrier_id: user.company_id, status: "active" }
    });

    const inShopTruck = await Truck.count({
      where: { carrier_id: user.company_id, status: "in_shop" }
    });

    const currentDate = new Date();
    const startDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    const endDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);

    // Adjust the time part of the start and end dates to be 00:00:00
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const permitsDueIn30Days = await Permit.count({
      where: {
        carrier_id: user.company_id,
        end_date: {
          [sequelize.Op.between]: [startDate, endDate]
        }
      },
    });

    const permitsOverDue = await Permit.count({
      where: {
        carrier_id: user.company_id,
        end_date: {
          [sequelize.Op.lte]: Date.now()
        }
      },
    });

    const inspectionDueIn30Days = await Inspection.count({
      where: {
        date: {
          [sequelize.Op.between]: [startDate, endDate]
        }
      }
    });

    const inspectionOverdue = await Inspection.count({
      where: {
        date: {
          [sequelize.Op.lte]: Date.now()
        }
      }
    });

    res.status(200).json({
      serviceReminders: {
        due_in_30_days: permitsDueIn30Days,
        overdue: permitsOverDue
      },
      inspection: {
        due_in_30_days: inspectionDueIn30Days,
        overdue: inspectionOverdue
      },
      trucks: {
        active: activeTruck,
        in_shop: inShopTruck
      },
      trailers: {
        active: 19,
        in_shop: 32
      },
    });
  } catch (error) {
    (error);
    next(createHttpError(500, "Internal server error"));
  }
};