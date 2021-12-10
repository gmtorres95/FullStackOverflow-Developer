export default class InvalidToken extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidToken.prototype);
  }
}
