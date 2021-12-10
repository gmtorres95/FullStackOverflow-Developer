import { Request, Response } from 'express';
import Student from '../interfaces/Student';
import * as userService from '../services/userService';

export async function createUser(req: Request, res: Response) {
  try {
    const student: Student = req.body;
    if (!student.name || !student.class || student.name.length > 20 || student.class.length > 4) res.sendStatus(400);
    
    const token = await userService.createUser(student);
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}