import { Request, Response, NextFunction } from "express";
import QuestionNotFound from "../errors/QuestionNotFound";
import ValidationError from '../errors/ValidationError';
import Question from "../interfaces/Question";
import * as validations from '../validations/validations';
import * as questionsService from '../services/questionsService';

export async function postQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const { studentData } = res.locals;
    const questionData: Question = req.body;
    await validations.validateQuestion(questionData);

    const id = await questionsService.postQuestion(questionData, studentData);
    res.send({ id });
  } catch (error) {
    if (error instanceof ValidationError) return res.status(400).send(error.message);
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
