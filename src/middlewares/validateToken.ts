import { Request, Response, NextFunction } from 'express';
import connection from '../database';
import InvalidToken from '../errors/InvalidToken';
import Student from '../interfaces/Student';

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token || token.length !== 36) throw new InvalidToken('Missing token or invalid token');

    const result = await connection.query(`
      SELECT
        students.id,
        students.name,
        students.token,
        students.points,
        classes.class
      FROM students
      JOIN classes
        ON students.class_id = classes.id
      WHERE students.token = $1`,
      [token],
    );
    if (!result.rowCount) throw new InvalidToken('This token does not exist');

    const studentData: Student = result.rows[0];
    res.locals.studentData = studentData;
    next();
  } catch (error) {
    if (error instanceof InvalidToken) return res.status(401).send(error.message);
    next(error);
  }
}