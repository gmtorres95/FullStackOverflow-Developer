import { Request, Response, NextFunction } from 'express';
import * as rankingService from '../services/rankingServices';

export async function listRanking(reqm: Request, res: Response, next: NextFunction) {
  try {
    const ranking = await rankingService.listRaking();
    res.send(ranking);
  } catch (error) {
    next(error);
  }
}
