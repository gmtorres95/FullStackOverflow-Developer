class QuestionNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuestionNotFound';
  }
}

export default QuestionNotFound;
