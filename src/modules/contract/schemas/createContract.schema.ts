import { Joi } from 'celebrate';

const createContractSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().default(null).optional(),
  statusContract: Joi.object().default({ id: 1 }),
  interested: Joi.array()
    .items(Joi.object({ id: Joi.number().required() }))
    .default([]),
});

export { createContractSchema };