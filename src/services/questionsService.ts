import NewQuestion from '../interfaces/NewQuestion';
import QuestionNotFound from '../errors/QuestionNotFound';
import Student from '../interfaces/Student';
import Answer from '../interfaces/Answer';
import * as questionsRepository from '../repositories/questionsRepository';

export async function postQuestion(questionData: NewQuestion, studentData: Student) {
  const questionId = await questionsRepository.postQuestion(questionData, studentData);

  let tags = questionData.tags?.split(', ');
  tags = [...new Set(tags)];
  
  tags.map(async (tag) => {
    let tagId = await questionsRepository.getTagId(tag);
    if (!tagId) tagId = await questionsRepository.postTag(tag);
    await questionsRepository.postQuestionTag(tagId, questionId);
  });

  return questionId;
}

export async function postAnswer(answer: Answer) {
  const question = await questionsRepository.getQuestion(answer.questionId);
  answer.studentNewPoints = answer.studentInitialPoints + question.score;
  
  await questionsRepository.postAnswer(answer);
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

export async function vote(questionId: number, isUpvote: boolean) {
  const question = await questionsRepository.getQuestion(questionId);
  if (!question) throw new QuestionNotFound('This question does not exist');

  const newScore = isUpvote ? question.score + 1 : question.score - 1;
  await questionsRepository.vote(questionId, newScore);
}
