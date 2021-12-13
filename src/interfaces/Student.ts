interface NewStudent {
  id: number;
  name: string;
  class: string;
  answers: number;
  studentInitialPoints: number;
  studentNewPoints?: number;
  token: string;
}

export default NewStudent;
