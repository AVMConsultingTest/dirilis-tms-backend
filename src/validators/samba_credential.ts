import Joi from "joi";
import { ISambaCredentialCreate, ISambaCredentialUpdate } from "../models";
import { sambaCredentialService } from "../services";

type ISambaCredentialParams = {
  samba_credential_id: number
}

export const sambaCredentialValidator = {
  create: {
    body: Joi.object<ISambaCredentialCreate>({
      x_api_key: Joi.string().required(),
      client_id: Joi.string().required(),
      client_secret: Joi.string().required(),
    })
  },
  update: {
    params: Joi.object<ISambaCredentialParams>({
      samba_credential_id: Joi.number().required()
    }),
    body: Joi.object<ISambaCredentialUpdate>({
      x_api_key: Joi.string(),
      client_id: Joi.string(),
      client_secret: Joi.string(),
    })
  },
  many: {
    query: Joi.object<Flat<Query<sambaCredentialService.WhereMany>, "where">>({
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<ISambaCredentialParams>({
      samba_credential_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<ISambaCredentialParams>({
      samba_credential_id: Joi.number().required()
    })
  }
};