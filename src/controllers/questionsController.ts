import { Request, Response, NextFunction } from "express";
import ClassNotFound from "../errors/ClassNotFound";
import ValidationError from '../errors/ValidationError';
import Question from "../interfaces/Question";
import * as validations from '../validations/validations';
import * as questionsService from '../services/questionsService';

export async function postQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const questionData: Question = req.body;

    const id = await questionsService.postQuestion(questionData);
    res.send({ id });
  } catch (error) {
    next(error);
  }
}