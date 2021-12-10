import ValidationError from '../errors/ValidationError';
import Student from '../interfaces/Student';
import * as schemas from './schemas';

export async function validateStudent(student: Student) {
  const joiValidation = schemas.studentSchema.validate(student);
  if (joiValidation.error) throw new ValidationError(joiValidation.error.details[0].message);
}
