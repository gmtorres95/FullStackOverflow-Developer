import { Request, Response, NextFunction } from "express";
import QuestionNotFound from "../errors/QuestionNotFound";
import ValidationError from '../errors/ValidationError';
import NewQuestion from "../interfaces/NewQuestion";
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
    const { studentData } = res.locals;
    const questionId = Number(req.params.id);
    const answer: string = req.body.answer;
    await validations.validateAnswer(answer);
    await validations.validateId(questionId);

    await questionsService.postAnswer(answer, studentData, questionId);
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
