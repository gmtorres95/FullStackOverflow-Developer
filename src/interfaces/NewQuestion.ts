export default interface NewQuestion {
	question: string;
	student: string;
	class: string;
	tags: string;
  classId?: number;
  studentId?: number;
};
