export default class QuestionNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuestionNotFound';
  }
}
