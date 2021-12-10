import ValidationError from '../errors/ValidationError';
import Question from '../interfaces/Question';
import Student from '../interfaces/Student';
import * as schemas from './schemas';

export async function validateStudent(student: Student) {
  const joiValidation = schemas.studentSchema.validate(student);
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}

export async function validateQuestion(question: Question) {
  const joiValidation = schemas.questionSchema.validate(question);
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}
