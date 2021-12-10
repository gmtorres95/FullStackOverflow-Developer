import NewQuestion from '../interfaces/NewQuestion';
import QuestionNotFound from '../errors/QuestionNotFound';
import Student from '../interfaces/Student';
import * as questionsRepository from '../repositories/questionsRepository';

export async function postQuestion(questionData: NewQuestion, studentData: Student) {
  return await questionsRepository.postQuestion(questionData, studentData);
}

export async function postAnswer(answer: string, studentData: Student, questionId: number) {
  await questionsRepository.postAnswer(answer, studentData, questionId);
}

export async function getQuestions() {
  const questions = await questionsRepository.getQuestions();
  if (!questions.length) throw new QuestionNotFound('No question to be answered');
  return questions;
}

export async function getQuestion(questionId: number) {
  const question = await questionsRepository.getQuestion(questionId);
  if (!question) throw new QuestionNotFound('This question does not exist');

  if (!question.answered) {
    delete question.answeredAt;
    delete question.answeredBy;
    delete question.answer;
  }
  return question;
}
