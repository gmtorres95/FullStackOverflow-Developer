import joi from 'joi';

export const studentSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(20)
    .required(),
  class: joi
    .string()
    .pattern(/^T[1-9]\d*$/)
    .max(4)
    .required()
});
