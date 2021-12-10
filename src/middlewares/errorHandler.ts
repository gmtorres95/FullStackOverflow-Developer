import { Request, Response, NextFunction } from 'express';

export default async function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.sendStatus(500);
}
