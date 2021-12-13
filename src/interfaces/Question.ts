interface Question {
  id?: number;
  question: string;
  student: string;
  class: string;
  tags?: string;
  score?: number;
  answered?: boolean;
  submitAt: string;
  answeredAt?: string;
  answeredBy?: string;
  answer?: string;
}

export default Question;
