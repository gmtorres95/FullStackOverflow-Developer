import connection from '../database';
import Student from '../interfaces/Student';
import Question from '../interfaces/Question';

export async function getStudent(name: string): Promise<Student> {
  const result = await connection.query(`
      SELECT 
        students.id,
        students.name,
        classes.class
      FROM students
      JOIN classes
        ON students.class_id = classes.id
      WHERE students.name = $1`,
      [name],
  );
  return result.rows[0];
}

export async function postQuestion(questionData: Question): Promise<number> {
  const { question, studentId, tags } = questionData;
  const result = await connection.query(
    'INSERT INTO questions (question, student_id, tags) VALUES ($1, $2, $3) RETURNING id',
    [question, studentId, tags],
  );
  return result.rows[0].id;
}