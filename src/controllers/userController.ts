import { Request, Response, NextFunction } from 'express';
import ClassNotFound from '../errors/ClassNotFound';
import ValidationError from '../errors/ValidationError';
import Student from '../interfaces/Student';
import * as validations from '../validations/validations';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const student: Student = req.body;
    await validations.validateStudent(student);

    const token = await userService.createUser(student);
    res.send({ token });
  } catch (error) {
    if (error instanceof ClassNotFound) return res.status(404).send(error.message);
    if (error instanceof ValidationError) return res.status(400).send(error.message);
    next(error);
  }
}