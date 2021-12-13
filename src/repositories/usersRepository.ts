import connection from '../database';
import NewStudent from '../interfaces/NewStudent';

export async function getClassId(className: string): Promise<number> {
  const result = await connection.query(
    'SELECT id FROM classes WHERE class = $1',
    [className],
  );
  return result.rows[0]?.id;
}

export async function createUser(student: NewStudent) {
  const { name, classId, token } = student;
  await connection.query(
    'INSERT INTO students (name, class_id, token) VALUES ($1, $2, $3)',
    [name, classId, token],
  );
}
