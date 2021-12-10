export default class QuestionNotFound extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, QuestionNotFound.prototype);
  }
}
