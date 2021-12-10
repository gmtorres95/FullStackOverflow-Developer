export default interface Question {
	question: string;
	student: string;
	class: string;
	tags: string;
  classId?: number;
  studentId?: number;
};
