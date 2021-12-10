import { Request, Response, NextFunction } from "express";
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
