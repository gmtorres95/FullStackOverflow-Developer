export default interface UnansweredQuestion {
  id: number;
  question: string;
  student: string;
  class: string;
  submitAt: string;
  answered?: boolean;
};
