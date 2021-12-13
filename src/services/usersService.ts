import { v4 as uuid } from 'uuid';
import NewStudent from '../interfaces/NewStudent';
import ClassNotFound from '../errors/ClassNotFound';
import * as usersRepository from '../repositories/usersRepository';

export async function createUser(student: NewStudent) {
  student.classId = await usersRepository.getClassId(student.class);
  if (!student.classId) throw new ClassNotFound('This class does not exist');

  student.token = uuid();
  await usersRepository.createUser(student);
  return student.token;
}
