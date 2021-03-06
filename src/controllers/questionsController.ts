import { Request, Response, NextFunction } from 'express';
import QuestionNotFound from '../errors/QuestionNotFound';
import ValidationError from '../errors/ValidationError';
import DuplicatedVote from '../errors/DuplicatedVote';
import NewQuestion from '../interfaces/NewQuestion';
import Answer from '../interfaces/Answer';
import Student from '../interfaces/Student';
import Vote from '../interfaces/Vote';
import * as validations from '../validations/validations';
import * as questionsService from '../services/questionsService';

export async function postQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { studentData } = res.locals;
    const questionData: NewQuestion = req.body;
    await validations.validateQuestion(questionData);

    const id = await questionsService.postQuestion(questionData, studentData);
    res.send({ id });
  } catch (error) {
    if (error instanceof ValidationError) return res.status(400).send(error.message);
    next(error);
  }
}

export async function postAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    const answer: Answer = {
      studentId: res.locals.studentData.id,
      studentAnswers: res.locals.studentData.answers,
      studentInitialPoints: res.locals.studentData.points,
      questionId: Number(req.params.id),
      text: req.body.answer,
    };
    await validations.validateAnswer(answer.text);
    await validations.validateId(answer.questionId);

    await questionsService.postAnswer(answer);
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof ValidationError) return res.status(400).send(error.message);
    if (error.code === '23505') return res.status(409).send('This question has already been answered');
    next(error);
  }
}

export async function getQuestions(req: Request, res: Response, next: NextFunction) {
  try {
    const questions = await questionsService.getQuestions();
    res.send(questions);
  } catch (error) {
    if (error instanceof QuestionNotFound) return res.status(404).send(error.message);
    next(error);
  }
}

export async function getQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const questionId = Number(req.params.id);
    await validations.validateId(questionId);

    const question = await questionsService.getQuestion(questionId);
    res.send(question);
  } catch (error) {
    if (error instanceof ValidationError) return res.status(400).send(error.message);
    if (error instanceof QuestionNotFound) return res.status(404).send(error.message);
    next(error);
  }
}

export async function vote(req: Request, res: Response, next: NextFunction) {
  try {
    const voteData: Vote = {
      studentId: res.locals.studentData.id,
      questionId: Number(req.params.id),
      isUpvote: req.url.split('/')[2] === 'up-vote',
    };
    await validations.validateId(voteData.questionId);

    await questionsService.vote(voteData);
    res.sendStatus(201);
  } catch (error) {
    if (error instanceof ValidationError) return res.status(400).send(error.message);
    if (error instanceof QuestionNotFound) return res.status(404).send(error.message);
    if (error instanceof DuplicatedVote) return res.status(409).send(error.message);
    next(error);
  }
}
