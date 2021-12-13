class DuplicatedVote extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicatedVote';
  }
}

export default DuplicatedVote;
