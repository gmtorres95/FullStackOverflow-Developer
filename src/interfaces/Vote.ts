interface Vote {
  studentId: number;
  questionId: number;
  isUpvote: boolean;
  newScore?: number;
}

export default Vote;
