export default interface Answer {
  studentId: number;
  studentInitialPoints: number;
  studentNewPoints?: number;
  questionId: number;
  text: string;
};
