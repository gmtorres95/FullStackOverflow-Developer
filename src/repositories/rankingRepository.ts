import connection from '../database';

export async function listRanking() {
  const result = await connection.query(
    'SELECT name, answers, points FROM students ORDER BY points DESC LIMIT 10'
  );
  return result.rows;
}
