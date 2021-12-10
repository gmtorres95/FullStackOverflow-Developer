import Question from '../interfaces/Question';
import StudentNotFound from '../errors/StudentNotFound';
import ClassNotFound from '../errors/ClassNotFound';
import * as questionsRepository from '../repositories/questionsRepository';
import * as userRepository from '../repositories/usersRepository';

export async function postQuestion(questionData: Question) {
  questionData.classId = await userRepository.getClassId(questionData.class);
  if (!questionData.classId) throw new ClassNotFound('This class does not exist');

  const studentData = await questionsRepository.getStudent(questionData.student);
  if (!studentData) throw new StudentNotFound('This student does not exist');

  questionData.studentId = studentData.id;
  return questionsRepository.postQuestion(questionData);
}
