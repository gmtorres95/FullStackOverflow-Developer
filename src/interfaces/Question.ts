export default interface Question {
  id: number;
  question: string;
  student: string;
  class: string;
  submitAt: string;
  answered?: boolean;
  answeredAt?: string;
	answeredBy?: string;
	answer?: string;
};
