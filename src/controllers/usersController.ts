import { Request, Response, NextFunction } from 'express';
import ClassNotFound from '../errors/ClassNotFound';
import ValidationError from '../errors/ValidationError';
import NewStudent from '../interfaces/NewStudent';
import * as validations from '../validations/validations';
import * as usersService from '../services/usersService';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const student: NewStudent = req.body;
    await validations.validateStudent(student);

    const token = await usersService.createUser(student);
    res.status(201).send({ token });
  } catch (error) {
    if (error instanceof ClassNotFound) return res.status(404).send(error.message);
    if (error instanceof ValidationError) return res.status(400).send(error.message);
    next(error);
  }
}
