import Question from '../interfaces/Question';
import Student from '../interfaces/Student';
import * as questionsRepository from '../repositories/questionsRepository';

export async function postQuestion(questionData: Question, studentData: Student) {
  return questionsRepository.postQuestion(questionData, studentData);
}
