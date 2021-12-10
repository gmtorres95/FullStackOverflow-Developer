import { v4 as uuid } from 'uuid';
import Student from '../interfaces/Student';
import ClassNotFound from '../errors/ClassNotFound';
import * as userRepository from '../repositories/userRepository';

export async function createUser(student: Student) {
  student.classId = await userRepository.getClassId(student.class);
  if (!student.classId) throw new ClassNotFound('This class does not exist');

  student.token = uuid();
  await userRepository.createUser(student);
  return student.token;
}
