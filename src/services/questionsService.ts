import Student from '../interfaces/Student';
import Question from '../interfaces/Question';
import QuestionNotFound from '../errors/QuestionNotFound';
import * as questionsRepository from '../repositories/questionsRepository';

export async function postQuestion(questionData: Question, studentData: Student) {
  return await questionsRepository.postQuestion(questionData, studentData);
}

export async function getQuestions() {
  const questions = await questionsRepository.getQuestions();
  if (!questions.length) throw new QuestionNotFound('No question to be answered');
  return questions;
}
