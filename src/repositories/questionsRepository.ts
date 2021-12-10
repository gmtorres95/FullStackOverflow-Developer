import connection from '../database';
import Student from '../interfaces/Student';
import Question from '../interfaces/Question';

export async function postQuestion(questionData: Question, studentData: Student): Promise<number> {
  const { question, tags } = questionData;
  const { id: studentId } = studentData;
  const result = await connection.query(
    'INSERT INTO questions (question, student_id, tags) VALUES ($1, $2, $3) RETURNING id',
    [question, studentId, tags],
  );
  return result.rows[0].id;
}
