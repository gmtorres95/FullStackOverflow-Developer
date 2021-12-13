import connection from '../database';
import RankedStudent from '../interfaces/RankedStudent';

export async function listRanking(): Promise<RankedStudent[]> {
  const result = await connection.query(
    'SELECT name, answers, points FROM students ORDER BY points DESC LIMIT 10',
  );
  return result.rows;
}
