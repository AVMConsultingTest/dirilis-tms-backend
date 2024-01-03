import Joi from "joi";
import { driverBoardService } from "../services";

type IDriverBoardCreate = {
  driver_id: number;
  notes: string;
  on_time?: number;
  acceptance?: number;
  carrier_id?: number;
};

type IDriverBoardUpdate = {
  driver_id?: number;
  notes?: string;
  on_time?: number;
  acceptance?: number;
  carrier_id?: number;
};

type IDriverBoardParams = {
  driver_board_id: number;
};

export const driverBoardValidator = {
  create: {
    body: Joi.object<IDriverBoardCreate>({
      driver_id: Joi.number().required(),
      carrier_id: Joi.number().optional(),
      notes: Joi.string().required(),
      on_time: Joi.number().optional(),
      acceptance: Joi.number().optional(),
    }),
  },
  many: {
    query: Joi.object<Flat<Query<driverBoardService.WhereMany>, "where">>({
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  update: {
    params: Joi.object<IDriverBoardParams>({
      driver_board_id: Joi.number().required()
    }),
    body: Joi.object<IDriverBoardUpdate>({
      driver_id: Joi.number().optional(),
      on_time: Joi.number().optional(),
      acceptance: Joi.number().optional(),
      notes: Joi.string().optional(),
    })
  },
  delete: {
    params: Joi.object<IDriverBoardParams>({
      driver_board_id: Joi.number().required()
    })
  },
};
