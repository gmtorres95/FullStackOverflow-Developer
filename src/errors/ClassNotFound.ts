class ClassNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ClassNotFound';
  }
}

export default ClassNotFound;
