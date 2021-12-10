import connection from '../database';
import Student from '../interfaces/Student';
import NewQuestion from '../interfaces/NewQuestion';
import Question from '../interfaces/Question';

export async function postQuestion(questionData: NewQuestion, studentData: Student): Promise<number> {
  const { question, tags } = questionData;
  const { id: studentId } = studentData;
  const result = await connection.query(
    'INSERT INTO questions (question, student_id, tags) VALUES ($1, $2, $3) RETURNING id',
    [question, studentId, tags],
  );
  return result.rows[0].id;
}

export async function getQuestions(): Promise<Question[]> {
  const result = await connection.query(`
    SELECT
      questions.id,
      questions.question,
      students.name as student,
      classes.class,
      questions."submitAt"
    FROM questions
    JOIN students
      ON questions.student_id = students.id
    JOIN classes
      ON students.class_id = classes.id
    WHERE answered = FALSE`
  );
  return result.rows;
}
