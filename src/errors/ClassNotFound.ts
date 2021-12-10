export default class ClassNotFound extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ClassNotFound.prototype);
  }
}