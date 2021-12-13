import connection from '../database';
import Student from '../interfaces/Student';
import Answer from '../interfaces/Answer';
import NewQuestion from '../interfaces/NewQuestion';
import Question from '../interfaces/Question';
import Vote from '../interfaces/Vote';

export async function getTagId(tag: string): Promise<number> {
  const result = await connection.query(
    'SELECT id FROM tags WHERE tag = $1',
    [tag],
  );
  return result.rows[0]?.id;
}

export async function postTag(tag: string): Promise<number> {
  const result = await connection.query(
    'INSERT INTO tags (tag) VALUES ($1) RETURNING id',
    [tag],
  );
  return result.rows[0].id;
}

export async function postQuestionTag(tagId: number, questionId: number) {
  await connection.query(
    'INSERT INTO questions_tags (tag_id, question_id) VALUES ($1, $2)',
    [tagId, questionId],
  );
}

export async function postQuestion(questionData: NewQuestion, studentData: Student): Promise<number> {
  const { question } = questionData;
  const { id: studentId } = studentData;
  const result = await connection.query(
    'INSERT INTO questions (question, student_id) VALUES ($1, $2) RETURNING id',
    [question, studentId],
  );
  return result.rows[0].id;
}

export async function postAnswer(answer: Answer) {
  const {
    studentId,
    studentAnswers,
    studentNewPoints,
    questionId,
    text,
  } = answer;
  await connection.query(
    'INSERT INTO answers (answer, student_id, question_id) VALUES ($1, $2, $3)',
    [text, studentId, questionId],
  );
  await connection.query(
    'UPDATE questions SET answered = TRUE WHERE id = $1',
    [questionId],
  );
  await connection.query(
    'UPDATE students SET answers = $1, points = $2 WHERE id = $3',
    [studentAnswers + 1, studentNewPoints, studentId],
  );
}

export async function getQuestions(): Promise<Question[]> {
  const result = await connection.query(`
    SELECT
      questions.id,
      questions.question,
      students.name as student,
      classes.class,
      questions.score,
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
      (
        SELECT string_agg(tags.tag, ', ' ORDER BY tags.tag)
        FROM tags
        JOIN questions_tags
          ON tags.id = questions_tags.tag_id
        WHERE questions_tags.question_id = questions.id
      ) AS tags,
      questions.score,
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

export async function getVote(voteData: Vote): Promise<number> {
  const {
    questionId,
    studentId,
  } = voteData;
  const result = await connection.query(
    'SELECT * FROM votes WHERE (question_id = $1 AND student_id = $2)',
    [questionId, studentId],
  );
  return result.rows[0]?.id;
}

export async function vote(voteData: Vote) {
  const {
    questionId,
    studentId,
    newScore,
    isUpvote,
  } = voteData;
  await connection.query(
    'UPDATE questions SET score = $1 WHERE id = $2',
    [newScore, questionId],
  );
  await connection.query(
    'INSERT INTO votes (question_id, student_id, is_upvote) VALUES ($1, $2, $3)',
    [questionId, studentId, isUpvote],
  );
}
