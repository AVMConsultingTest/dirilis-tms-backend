import { Request, Response, NextFunction } from "express";

export const getPayrollSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      total_drivers_curr_month: 1,
      total_drivers_prev_month: 1,
      total_drivers_change_per: 1,
      total_drivers_arrow: 1,
      companies: 1,
      leases: 1,
      owner_operators: 1,
      total_drivers_paystubs_curr_month: 1,
      total_drivers_paystubs_prev_month: 1,
      total_drivers_paystubs_change_per: 1,
      total_drivers_paystubs_arrow: 1,
      processing_paystubs: 1,
      in_dispute_paystubs: 1,
      submitted_paystubs: 1,
      paid_paystubs: 1,
      total_trucking_cost_curr_month: 1,
      total_trucking_cost_prev_month: 1,
      total_trucking_cost_change_per: 1,
      total_trucking_cost_arrow: 1,
      total_cost: 1,
      company_driver_cost: 1,
      dispatch_cost: 1,
      total_revenue_curr_month: 1,
      total_revenue_prev_month: 1,
      total_revenue_change_per: 1,
      total_revenue_arrow: 1,
      revenue_company_driver_cost: 1,
      revenue_trucking_cost: 1,
      revenue_dispatch_cost: 1
    };

    res.status(200).json(data);
  }
  catch (error) {
    next(error);
  }
};
