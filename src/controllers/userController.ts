import { Request, Response } from 'express';
import Student from '../interfaces/Student';
import * as validations from '../validations/validations';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
  try {
    const student: Student = req.body;
    await validations.validateStudent(student);
    
    const token = await userService.createUser(student);
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}