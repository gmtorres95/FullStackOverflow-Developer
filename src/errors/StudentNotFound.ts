export default class StudentNotFound extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, StudentNotFound.prototype);
  }
}