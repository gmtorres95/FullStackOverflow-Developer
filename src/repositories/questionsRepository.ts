import connection from '../database';
import Student from '../interfaces/Student';
import NewQuestion from '../interfaces/NewQuestion';
import Question from '../interfaces/Question';

export async function getTagId(tag: string): Promise<number> {
  const result = await connection.query(
    'SELECT id FROM tags WHERE tag = $1',
    [tag],
  )
  return result.rows[0]?.id;
}

export async function postQuestion(questionData: NewQuestion, studentData: Student): Promise<number> {
  const { question, tags } = questionData;
  const { id: studentId } = studentData;
  const result = await connection.query(
    'INSERT INTO questions (question, student_id, tags) VALUES ($1, $2, $3) RETURNING id',
    [question, studentId, tags],
  );
  return result.rows[0].id;
}

export async function postAnswer(answer: string, studentData: Student, questionId: number) {
  const { id: studentId } = studentData;
  await connection.query(
    'INSERT INTO answers (answer, student_id, question_id) VALUES ($1, $2, $3)',
    [answer, studentId, questionId],
  );
  await connection.query(
    'UPDATE questions SET answered = TRUE WHERE id = $1',
    [questionId],
  );
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

export async function getQuestion(questionId: number): Promise<Question> {
  const result = await connection.query(`
    SELECT
      questions.question,
      students.name as student,
      classes.class,
      questions.tags,
      questions.answered,
      questions."submitAt",
      answers."answeredAt",
      (
        SELECT name FROM students WHERE id = answers.student_id
      ) as "answeredBy",
      answers.answer
    FROM questions
    JOIN students
      ON questions.student_id = students.id
    JOIN classes
      ON students.class_id = classes.id
    LEFT JOIN answers
      ON questions.id = answers.question_id
    WHERE questions.id = $1`,
    [questionId],
  );
  return result.rows[0];
}
