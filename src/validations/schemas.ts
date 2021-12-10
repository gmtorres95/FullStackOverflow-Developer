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

export const questionSchema = joi.object({
  question: joi
    .string()
    .min(3)
    .max(20000)
    .required(),
  tags: joi
    .string()
    .min(0)
    .max(255)
});

export const answerSchema = joi
  .string()
  .min(3)
  .max(20000)
  .required();
