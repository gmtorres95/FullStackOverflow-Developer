export default interface NewStudent {
  id: number;
  name: string;
  class: string;
  answers: number;
  studentInitialPoints: number;
  studentNewPoints?: number;
  token: string;
};
