import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { User } from "../models/user";
import { IPermitCreate, IPermitUpdate, Permit } from "../models/permit";
import { permitValidator } from "../validators/index";
import { Company } from "../models/company";
import sequelize from "sequelize";

export const createPermit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = permitValidator.create.body.validate(req.body);
    if (error) return next(createHttpError(400, error.details[0].message));

    // get the user id from the request
    const userId = (req.user).id;
        
    const user = await User.findByPk(userId, { attributes: ["company_id"] });

    const existingCompany = await Company.findOne( { where: { id: user.company_id } } );
    if (!existingCompany) return next(createHttpError(404, "Company not found"));

    const permit :IPermitCreate = req.body;

    // Calculate the permit duration
    const startDate = new Date(permit.start_date);
    const endDate = new Date(permit.end_date);
    const permitDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    permit.duration = `${permitDuration} days`;
    permit.carrier_id = user.company_id;

    // Create a new Permit instance using the provided data
    const { id } = await Permit.create(permit);

    res.status(201).json({ id });

  } catch (error) {
    console.error(error);
    next(createHttpError(500, "Internal server error"));
  }
};

export const getPermits = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get pagination parameters from the request or set default values
    const page_size = Number(req.query.page_size) || 10;
    const page_number = Number(req.query.page_number) || 1;

    const offset = (page_number - 1) * page_size;

    // get the user id from the request
    const userId = (req.user).id;

    // get the user's company
    const user = await User.findByPk(userId, { attributes: ["company_id"] });

    const existingCompany = await Company.findOne( { where: { id: user.company_id } } );
    if (!existingCompany) return next(createHttpError(404, "Company not found"));

    // Query to filter
    const queryFilter = { carrier_id: user.company_id };  // Adjust as needed

    const permits = await Permit.findAll({
      where: queryFilter,
      limit: page_size,
      offset: offset,
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });
    res.status(200).json({ 
      page_size,
      page_number,
      total_pages: Math.ceil(permits.length / page_size),
      data: permits,
    });
  } catch (error) {
    (error);
    next(createHttpError(500, "Something went wrong"));
  }
};

export const getPermitById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = permitValidator.one.params.validate(req.params);
    if (error) return next(createHttpError(400, error.details[0].message));

    const permit = await Permit.findByPk(req.params.permit_id);

    if (!permit) return next(createHttpError(404, `Permit with id ${req.params.permit_id} not found`));

    res.status(200).json(permit);
        
  } catch (error) {
    (error);
    next(createHttpError(500, "Internal server error"));
  }
};

export const updatePermit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = permitValidator.update.body.validate(req.body);
    const { error: paramsError } = permitValidator.update.params.validate(req.params);
    if (error) return next(createHttpError(400, error.details[0].message));
    if (paramsError) return next(createHttpError(400, paramsError.details[0].message));

    // check if the permit exists
    const permit = await Permit.findByPk(req.params.permit_id);
    if (!permit) return next(createHttpError(404, `Permit with id ${req.params.permit_id} not found`));

    // update the permit
    const updatePermit : IPermitUpdate = req.body;

    if (updatePermit.start_date  || updatePermit.end_date) {
      // Calculate the permit duration
      const startDate = new Date(updatePermit.start_date || permit.start_date);
      const endDate = new Date(updatePermit.end_date || permit.end_date);
      const permitDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      updatePermit.duration = `${permitDuration} days`;
    }

    await permit.update(updatePermit);

    res.status(200).json({ message: `Permit with id ${permit.id} updated successfully` });
  } catch (error) {
    (error);
    next(createHttpError(500, "Internal server error"));
  }

};

export const deletePermit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = permitValidator.delete.params.validate(req.params);
    if (error) return next(createHttpError(400, error.details[0].message));

    // check if the permit exists
    const permit = await Permit.findByPk(req.params.permit_id);
    if (!permit) return next(createHttpError(404, `Permit with id ${req.params.permit_id} not found`));

    // delete the permit
    await permit.destroy();

    res.status(204).send();
  } catch (error) {
    (error);
    next(createHttpError(500, "Internal server error"));
  }
};

export const gePermitExpiringSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentDate = new Date();
    const startDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    const endDate: Date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);

    // Adjust the time part of the start and end dates to be 00:00:00
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const permits = await Permit.findAndCountAll({
      where: {
        end_date: {
          [sequelize.Op.between]: [startDate, endDate]
        }
      },
      attributes: [
        "permit_type",
        [sequelize.fn("COUNT", sequelize.col("id")), "permit_expiring_count"]
      ],
      group: ["permit_type"],
    });

    res.status(200).json(permits.rows);

  } catch (error) {
    (error);
    next(createHttpError(500, "Internal server error"));
  }
};
