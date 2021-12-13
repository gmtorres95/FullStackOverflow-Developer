interface Answer {
  studentId: number;
  studentAnswers: number;
  studentInitialPoints: number;
  studentNewPoints?: number;
  questionId: number;
  text: string;
}

export default Answer;
