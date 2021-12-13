export default interface NewQuestion {
	question: string;
	student: string;
	class: string;
	tags: string;
	tagIds?: number[];
  classId?: number;
  studentId?: number;
};
