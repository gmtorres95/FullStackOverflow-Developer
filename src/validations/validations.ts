import ValidationError from '../errors/ValidationError';
import NewQuestion from '../interfaces/NewQuestion';
import NewStudent from '../interfaces/NewStudent';
import * as schemas from './schemas';

export async function validateStudent(student: NewStudent) {
  const joiValidation = schemas.studentSchema.validate(student);
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}

export async function validateQuestion(question: NewQuestion) {
  const joiValidation = schemas.questionSchema.validate(question);
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}

export async function validateAnswer(answer: string) {
  const joiValidation = schemas.answerSchema.validate({ answer });
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}

export async function validateId(id: number) {
  const joiValidation = schemas.idSchema.validate({ id });
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}
